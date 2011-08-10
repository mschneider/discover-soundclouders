require 'httparty'
require 'json'
$LOAD_PATH.unshift File.expand_path(File.join(File.dirname(__FILE__), 'lib'))
require 'soundcloudcache'

if ARGV.empty?
  puts 'usage: ruby worker.rb <service_uri>'
  exit 1
end

class SoundcloudCache::RecommendationsCache
  def should_fetch? user
    true
  end
end

class Proxy
  include HTTParty
  base_uri ARGV.first
  format :json
  
  def self.publish user, result
    put("/recommendations/#{user['id']}?worker_key=#{ENV['WORKER_KEY']}", {
      :body => result.to_json
    })
  end
end

while true do
  response = Proxy.get('/job')
  if (response && response['computation'] == 'recommendations') then
    result = SoundcloudCache.recommendations response['user']
    Proxy.publish response['user'], result
  else
    sleep 1
  end
end
