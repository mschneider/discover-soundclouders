class SoundcloudCache
  class RelationshipCache < BaseCache

    def initialize name
      super()
      @name = name
      @connection = Connection.new
    end
    
    def fetch user
      result = CacheEntry.new
      for item in @connection.get id(user), @name do
        compressed_item = {}
        for key in stored_attributes do 
          compressed_item[key] = item[key.to_s]
        end
        result.push compressed_item
      end
      result
    end
    
    private
    
    def stored_attributes
      [:id, :permalink, :followers_count, :followings_count]
    end
  end
end