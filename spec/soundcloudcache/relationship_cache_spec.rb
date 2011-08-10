require File.expand_path(File.join(File.dirname(__FILE__), '..', '/spec_helper'))

describe SoundcloudCache::RelationshipCache do
  before :all do
    @user = { :id => :stub_id}
    @result = [{
      'id' => :other_id,
      'followers_count' => 10,
      'permalink' => :stub
    }]
    @cached_result = [{
      :id => :other_id,
      :permalink => :stub,
      :popularity => 1 + Math.log10(10)
    }]
  end
  
  it 'should fetch an uncached relationship and wrap it in a CacheEntry' do
    SoundcloudCache::Connection.any_instance.should_receive(:get).with(@user[:id], :relationship).and_return(@result)
    cache = SoundcloudCache::RelationshipCache.new(:relationship)
    result = cache.get @user
    result.should == @cached_result
    result.should be_instance_of(SoundcloudCache::CacheEntry)
  end
end