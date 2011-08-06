require 'json'
require 'sinatra'
require 'sinatra/namespace'
require 'soundcloud'
$LOAD_PATH.unshift File.expand_path(File.join(File.dirname(__FILE__), 'lib'))
require 'soundcloudcache'

set :sessions, true
set :soundcloud, {
  :client_id => ENV['CLIENT_ID'],
  :client_secret => ENV['CLIENT_SECRET'],
  :redirect_uri => 'http://localhost:9292/oauth',
  :site => 'soundcloud.com'
}

get '/' do
  if !session[:soundcloud]
    redirect '/login'
  end
  File.read(File.join('public', 'index.html'))
end

namespace '/me' do
  before do
    error 401, 'Authorize under /login first!' unless session[:soundcloud]
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
    recommendations = SoundcloudCache.recommendations @me.id
    recommendations.to_json
  end
end

get '/login' do
  redirect Soundcloud.new(settings.soundcloud).authorize_url
end

get '/logout' do
  session.clear
  redirect '/'
end

get '/oauth' do
  soundcloud_connection = Soundcloud.new settings.soundcloud
  soundcloud_connection.exchange_token :code => params[:code]
  session[:soundcloud] = soundcloud_connection.options.select do |key,value|
    [:access_token, :refresh_token, :expires_at].include? key
  end
  redirect '/'
end