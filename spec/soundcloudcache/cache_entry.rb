require File.expand_path(File.join(File.dirname(__FILE__), '..', '/spec_helper'))

describe SoundcloudCache::CacheEntry do
  before :all do
    @period = SoundcloudCache.options[:expiration_period] = 60
  end
  
  it 'should expire after the given period' do
    relationship = SoundcloudCache::CacheEntry.new
    Timecop.freeze(Time.now + @period + 1)
    relationship.should be_expired
    Timecop.return
  end
  
  it 'should not expire in the given period' do
    relationship = SoundcloudCache::CacheEntry.new
    Timecop.freeze(Time.now + @period - 1)
    relationship.should_not be_expired
    Timecop.return
  end  
end