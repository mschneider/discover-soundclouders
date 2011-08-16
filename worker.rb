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

  def self.pop_job
    get('/job', :query => {:worker_key => ENV['WORKER_KEY']})
  end
  
  def self.publish user, result
    put("/recommendations/#{user['id']}?worker_key=#{ENV['WORKER_KEY']}", {
      :body => result.to_json
    })
  end
end

EM.run do
  Fiber.new do
    while true do
      begin
        response = Proxy.pop_job
        if (response && response['computation'] == 'recommendations') then
          puts "#{Time.now} started computing recommendations for #{response['user']['permalink']}"
          result = SoundcloudCache.recommendations response['user']
          Proxy.publish response['user'], result
          puts "#{Time.now} finished computing recommendations for #{response['user']['permalink']}"
        else
          EM::Synchrony.sleep 10
        end
      rescue Exception => e
        puts e
      end
    end
  end.resume
end
