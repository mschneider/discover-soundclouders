require File.expand_path(File.join(File.dirname(__FILE__), '..', '/spec_helper'))

describe SoundcloudCache::RelationshipCache do
  before :all do
    @result = [{
      'id' => :id,
      'followers_count' => 10
    }]
    @cached_result = [{
      :id => :id,
      :popularity => Math.log10(10)
    }]
  end
  
  it 'should get an uncached relationship and wrap it in a SoundcloudCache::Relationship' do
    SoundcloudCache::Connection.any_instance.should_receive(:get).with('id', :relationship).and_return(@result)
    result = SoundcloudCache::RelationshipCache.new(:relationship).get(:id)
    result.should == @cached_result
    result.should be_instance_of(SoundcloudCache::Relationship)
  end  
  
  it 'should return an uncached relationship without accessing the connection' do
    SoundcloudCache::Connection.any_instance.should_receive(:get).with('id', :relationship).and_return(@result)
    cache = SoundcloudCache::RelationshipCache.new(:relationship)
    cache.get(:id)
    cache.get(:id).should == @cached_result
  end
end