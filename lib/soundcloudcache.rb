require 'singleton'
require 'soundcloudcache/base_cache'
require 'soundcloudcache/cache_entry'
require 'soundcloudcache/connection'
require 'soundcloudcache/recommendations_cache'
require 'soundcloudcache/relationship_cache'

class SoundcloudCache
  include Singleton
  attr_reader :connection, :options, :caches
  
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
  
  def get(cache_name, id)
    if self.class.cache_names.include? cache_name then
      @caches[cache_name.to_sym].get(id)
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
  
  def self.relationships
    [:followers, :followings]
  end
  
  def self.cache_names
    self.relationships + [:recommendations]
  end
  
  class << self
    SoundcloudCache.cache_names.each do |cache_name|
      define_method cache_name.to_s do |id|
        self.instance.get(cache_name, id)
      end
    end
  end
end