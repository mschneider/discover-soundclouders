require 'yajl'
class SoundcloudCache
  class RelationshipParser < Yajl::Parser
    attr_reader :result
    
    def initialize
      self.on_object_end = lambda { append_current_user }
      self.on_key = lambda { |k| filter_attribute k }
      self.on_value = lambda { |v| assign_attribute v }
      @result = []
      @current_user = {}
      @skipping = true
    end
    
    def accepted_attributes
      ['id', 'permalink', 'followers_count', 'followings_count']
    end
    
    def append_current_user
      @result << @current_user
      @current_user = {}
    end
    
    def assign_attribute value
      if !@skipping then
        @current_user[@last_key.to_sym] = value
        @skipping = true
      end
    end
    
    def filter_attribute key
      if accepted_attributes.include? key then
        @last_key = key
        @skipping = false
      end
    end
    
    def self.parse string
      parser = self.new
      parser.parse string
      parser.result
    end
  end
end