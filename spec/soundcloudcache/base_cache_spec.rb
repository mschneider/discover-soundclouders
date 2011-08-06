require File.expand_path(File.join(File.dirname(__FILE__), '..', '/spec_helper'))

describe SoundcloudCache::BaseCache do
  before :each do
    @cache = SoundcloudCache::BaseCache.new
    @entry = SoundcloudCache::CacheEntry.new
  end
  
  it 'should fetch if the value is not cached' do
    @cache.should_receive(:fetch).with(:id.to_s).and_return(@entry)
    @cache.get(:id).should == @entry
  end
  
  it 'should not fetch if the value is already cached' do
    @cache.should_receive(:fetch).with(:id.to_s).and_return(@entry)
    @cache.get(:id) # get once to fetch into cache
    @cache.get(:id).should == @entry
  end  
end
