class SoundcloudCache
  class RelationshipCache < BaseCache

    def initialize name
      super()
      @name = name
      @connection = Connection.new
    end
    
    def fetch user
      CacheEntry.new.replace @connection.get id(user), @name
    end
    
    private
    
    def stored_attributes
      [:id, :permalink, :followers_count, :followings_count]
    end
  end
end