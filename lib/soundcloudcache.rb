require 'eventmachine'
require 'em-http-request'
require 'em-synchrony'
require 'em-synchrony/em-http'
require 'json'
require 'singleton'
require 'soundcloudcache/base_cache'
require 'soundcloudcache/cache_entry'
require 'soundcloudcache/connection'
require 'soundcloudcache/recommendations_cache'
require 'soundcloudcache/relationship_cache'

module EventMachine
  module HttpEncoding
    def encode_request(method, uri, query, proxy)
      query = encode_query(uri, query)

      # Non CONNECT proxies require that you provide the full request
      # uri in request header, as opposed to a relative path.
      query = uri.join(query) if proxy
      puts "#{method.to_s.upcase}: #{query}"
      HTTP_REQUEST_HEADER % [method.to_s.upcase, query]
    end
  end
end

class SoundcloudCache
  include Singleton
  attr_reader :options, :caches
  
  def initialize
    @options = {
      :client_id => ENV['CLIENT_ID'],
      :expiration_period => 24 * 60 * 60
    }
    @caches = { :recommendations => RecommendationsCache.new }
    self.class.relationships.each do |r|
      @caches[r] = RelationshipCache.new r
    end
  end
  
  def get cache_name, user
    if self.class.cache_names.include? cache_name then
      @caches[cache_name.to_sym].get user
    end
  end
  
  def stats
    self.class.cache_names.map do | name |
      {
        :name => name.to_s,
        :size => @caches[name].size
      }
    end
  end
  
  def self.options
    self.instance.options
  end
  
  def self.put_recommendations id, recommendations
    instance.caches[:recommendations].put id, recommendations
  end
  
  def self.relationships
    [:followers, :followings]
  end
  
  def self.cache_names
    self.relationships + [:recommendations]
  end
  
  class << self
    SoundcloudCache.cache_names.each do |cache_name|
      define_method cache_name.to_s do |user|
        self.instance.get cache_name, user
      end
    end
  end
end