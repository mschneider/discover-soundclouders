require 'json'
require 'sinatra'
require 'sinatra/namespace'
require 'sinatra/synchrony'
# Sinatra::Synchrony.overload_tcpsocket!
require 'soundcloud'
$LOAD_PATH.unshift File.expand_path(File.join(File.dirname(__FILE__), 'lib'))
require 'jobqueue'
require 'soundcloudcache'

set :raise_errors, true
set :sessions, true
set :show_exceptions, false
set :soundcloud, {
  :client_id => ENV['CLIENT_ID'],
  :client_secret => ENV['CLIENT_SECRET'],
  :redirect_uri => ENV['REDIRECT_URI'],
  :site => 'soundcloud.com'
}

helpers do
  def recommendations user
    recommendations = SoundcloudCache.recommendations user
    if recommendations then
      recommendations.to_json
    else
      JobQueue.push_recommendations user
      [202, 'Computation is delayed.']
    end
  end
  
  def only_workers
    if (params[:worker_key] == ENV['WORKER_KEY']) then
      yield
    else
      [401, "Could not authenticate."]
    end
  end
end

get '/' do
  # clients having no or an expiring access token get redirected
  redirect to '/login' unless session[:soundcloud] && !session[:soundcloud][:refresh_token]
  File.read(File.join('public', 'index.html'))
end

get '/login' do
  redirect to "https://soundcloud.com/connect?scope=non-expiring&" + \
              "client_id=#{ENV['CLIENT_ID']}&response_type=code&" + \
              "redirect_uri=#{ENV['REDIRECT_URI']}"
end

get '/logout' do
  session.clear
  redirect to '/'
end

get '/oauth' do
  soundcloud_connection = Soundcloud.new settings.soundcloud
  soundcloud_connection.exchange_token :code => params[:code]
  session[:soundcloud] = { :access_token => soundcloud_connection.options[:access_token] }
  redirect to '/'
end

namespace '/me' do
  error 401 do
    "Authorize at #{url '/login'} before accessing this resource!"
  end
  
  error Soundcloud::ResponseError do
    # probably the user is not logged in
    # if soundcloud does not work - their oauth probably won't too..
    error 401
  end

  before do
    error 401 unless session[:soundcloud]
    @soundcloud = Soundcloud.new settings.soundcloud.merge session[:soundcloud]
    @me = @soundcloud.get '/me'
  end
  
  get '' do
    @me.to_json
  end
  
  get '/followings' do
    followings = @soundcloud.get "/users/#{@me.id}/followings"
    followings.to_json
  end
  
  get '/recommendations' do
    recommendations @me
  end
end

error Errno::ETIMEDOUT do
  [503, 'Could not finish computation in time.']
end

get '/recommendations/:id' do
  soundcloud = Soundcloud.new settings.soundcloud
  user = soundcloud.get "/users/#{params[:id]}"
  recommendations user
end

put '/recommendations/:id' do
  only_workers do
    begin
      data = JSON.parse request.body.read
      SoundcloudCache.put_recommendations params[:id], data
      [201, 'Recommendations stored.']
    rescue JSON::ParserError
      [400, "Invalid Data."]
    end
  end
end

get '/job' do
  only_workers do
    job = JobQueue.pop
    if job then
      job.to_json
    else
      [204, 'No jobs queued.']
    end
  end
end

get '/stats' do
  {
    :caches => SoundcloudCache.instance.stats,
    :jobs => JobQueue.instance.length
  }.to_json
end
