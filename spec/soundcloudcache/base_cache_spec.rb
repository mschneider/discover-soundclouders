require File.expand_path(File.join(File.dirname(__FILE__), '..', '/spec_helper'))

describe SoundcloudCache::BaseCache do
  before :each do
    @cache = SoundcloudCache::BaseCache.new
    @entry = SoundcloudCache::CacheEntry.new
    @user = { :id => :stub_id }
  end
  
  it 'should fetch if the value is not cached' do
    @cache.should_receive(:fetch).with(@user).and_return(@entry)
    @cache.get(@user).should == @entry
  end
  
  it 'should not fetch if the value is already cached' do
    @cache.should_receive(:fetch).with(@user).and_return(@entry)
    @cache.get(@user) # get once to fetch into cache
    @cache.get(@user).should == @entry
  end
end
