require 'json'
require 'sinatra'
require "sinatra/namespace"
require 'soundcloud'

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
  'Hello World'
end

namespace '/me' do
  get '/followings' do
    error 401, 'Authorize under /login first!' unless session[:soundcloud]
    soundcloud = Soundcloud.new settings.soundcloud.merge session[:soundcloud]
    user_id = soundcloud.get('/me').id
    followings = soundcloud.get("/users/#{user_id}/followings")
    followings.to_json
  end
end

get '/login' do
  redirect Soundcloud.new(settings.soundcloud).authorize_url + "&scope=non-expiring"
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