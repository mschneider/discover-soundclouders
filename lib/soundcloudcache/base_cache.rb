class SoundcloudCache
  class BaseCache
    
    def initialize
      @store = {}
    end
    
    def cached? id
      !!@store[id] && !@store[id].expired?
    end
    
    def fetch user
      raise "not implemented"
    end
    
    def should_fetch user
      true
    end
    
    def size
      @store.count
    end 
    
    def get user
      id = user[:id]
      if cached? id then
        @store[id]
      else
        if should_fetch user then
          @store[id] = fetch user
        else
          nil
        end
      end
    end
  end
end