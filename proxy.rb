require 'sinatra'
require 'soundcloud'

get '/login' do
  client = Soundcloud.new({:client_id => '6c574a63595f5f55c82cd58f945f932a'})
  redirect client.authorize_url(:redirect_uri => 'http://soundbone.herokuapp.com/oauth')
end

get '/oauth' do
  params[:code] + '|' + params[:access_token] + '|' + params[:expires_in]
end
