class SoundcloudCache
  class CacheEntry < Array
    attr_accessor :expires_at
  
    def initialize()
      @expires_at = Time.now + SoundcloudCache.options[:expiration_period]
    end
  
    def expired?
      @expires_at < Time.now
    end
  end
end