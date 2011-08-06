class SoundcloudCache
  class BaseCache
    
    def initialize
      @store = {}
    end
    
    def cached? id
      !!@store[id] && !@store[id].expired?
    end
    
    def fetch id
      raise "not implemented"
    end
    
    def get id
      id = id.to_s
      if cached? id then
        @store[id]
      else
        @store[id] = fetch id
      end
    end
  end
end