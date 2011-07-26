require 'sinatra'
require 'soundcloud'

get '/login' do
  client = Soundcloud.new({:client_id => '6c574a63595f5f55c82cd58f945f932a'})
  redirect client.authorize_url(:redirect_uri => 'http://soundbone.herokuapp.com/oauth')
end

get '/oauth' do
  code =  params[:code] || 'nil'
  access_token =  params[:access_token] || 'nil'
  expires_in = params[:expires_in] || 'nil'
  code + '|' + access_token + '|' + expires_in
end
