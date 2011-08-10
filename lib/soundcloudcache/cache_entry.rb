class SoundcloudCache
  class CacheEntry < Array
    
    def initialize
      @expires_at = Time.now + SoundcloudCache.options[:expiration_period]
    end
  
    def expired?
      @expires_at < Time.now
    end
  end
end