require 'json'
require 'sinatra'
require 'sinatra/namespace'
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

get '/' do
  redirect to '/login' unless session[:soundcloud]
  File.read(File.join('public', 'index.html'))
end

get '/login' do
  redirect to Soundcloud.new(settings.soundcloud).authorize_url
end

get '/logout' do
  session.clear
  redirect to '/'
end

get '/oauth' do
  soundcloud_connection = Soundcloud.new settings.soundcloud
  soundcloud_connection.exchange_token :code => params[:code]
  session[:soundcloud] = soundcloud_connection.options.select do |key,value|
    [:access_token, :refresh_token, :expires_at].include? key
  end
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
    @me = @soundcloud.get('/me')
  end
  
  get '' do
    @me.to_json
  end
  
  get '/followings' do
    followings = @soundcloud.get("/users/#{@me.id}/followings")
    followings.to_json
  end
  
  get '/recommendations' do
    recommendations = SoundcloudCache.recommendations @me
    if recommendations then
      recommendations.to_json
    else
      JobQueue.push @me.id
      [202, 'Computation is delayed.']
    end
  end
end

get '/job' do
  JobQueue.pop.to_json
end

get '/stats' do
  {
    :caches => SoundcloudCache.instance.stats,
    :jobs => JobQueue.instance
  }.to_json
end