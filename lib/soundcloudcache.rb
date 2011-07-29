require 'httmultiparty'
require 'singleton'
require 'soundcloudcache/connection'
require 'soundcloudcache/relationship'
require 'soundcloudcache/relationship_cache'

class SoundcloudCache
  include Singleton
  attr_reader :connection, :options, :caches
  
  def initialize
    @options = {
      :client_id => ENV['CLIENT_ID'],
      :expiration_period => 24 * 60 * 60
    }
    @caches = {}
    self.class.relationships.each do |r|
      @caches[r] = RelationshipCache.new r
    end
  end
  
  def get(relationship, id)
    if self.class.relationships.include? relationship then
      @caches[relationship].get(id)
    end
  end
  
  def self.options
    self.instance.options
  end
  
  def self.relationships
    [:followers, :followings]
  end
  
  class << self
    SoundcloudCache.relationships.each do |relationship|
      define_method relationship.to_s do |id|
        self.instance.get(relationship, id)
      end
    end
  end
end