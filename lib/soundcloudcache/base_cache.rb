class SoundcloudCache
  class BaseCache
    
    def initialize
      @store = {}
    end
    
    def get user
      if cached? user then
        @store[id(user)]
      elsif should_fetch? user then
        @store[id(user)] = fetch user
      end
    end
    
    def put id, data
      @store[id.to_s] = CacheEntry.new.replace data
    end
    
    def size
      @store.size
    end
    
    private
    
    def cached? user
      !!@store[id(user)] && !@store[id(user)].expired?
    end
    
    def fetch user
      raise "not implemented"
    end
    
    def id user
      (user[:id] || user['id']).to_s
    end
    
    def should_fetch? user
      true
    end
  end
end