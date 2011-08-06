class SoundcloudCache
  class RelationshipCache < BaseCache
    
    def initialize name
      super()
      @name = name
      @connection = Connection.new
    end
    
    def fetch id
      result = CacheEntry.new
      for item in @connection.get id, @name do
        result.push({
          :id => item['id'],
          :permalink => item['permalink'],
          :popularity => 1 + Math.log10(item['followers_count'])
        }) 
      end
      result
    end
  end
end