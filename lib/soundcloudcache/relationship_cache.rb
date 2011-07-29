class SoundcloudCache
  class RelationshipCache
    
    def initialize(relationship)
      @connection = Connection.new
      @relationship = relationship
      @store = {}
    end
    
    def cached?(id)
      !!@store[id] && !@store[id].expired?
    end
    
    def fetch(id)
      result = Relationship.new
      for item in @connection.get(id, @relationship) do
        result.push({
          :id => item['id'],
          :popularity => Math.log10(item['followers_count'])
        }) 
      end
      result
    end
    
    def get(id)
      id = id.to_s
      if cached? id then
        @store[id]
      else
        @store[id] = fetch id
      end
    end
  end
end