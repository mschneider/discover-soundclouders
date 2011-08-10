require File.expand_path(File.join(File.dirname(__FILE__), '..', '/spec_helper'))

describe SoundcloudCache::RelationshipCache do  
  describe 'fetch an relationship' do
    before :each do
      @user = { :id => :stub_id }
      @raw_result = Soundcloud::ArrayResponseWrapper.new [{
        'id' => :other_id,
        'followers_count' => 10,
        'followings_count' => 11,
        'permalink' => :stub,
      }]
      SoundcloudCache::Connection.any_instance.should_receive(:get).with(@user[:id].to_s, :relationship).and_return(@raw_result)
      @cache = SoundcloudCache::RelationshipCache.new(:relationship)
    end
    
    it 'should wrap the relationship in a CacheEntry' do
      result = @cache.fetch @user
      result.should be_instance_of(SoundcloudCache::CacheEntry)
    end
    
    it 'should contain the expected data' do
      expected_result = [Hash[@raw_result.first.to_a.map { |k, v| [k.to_sym, v] }]]
      result = @cache.fetch @user
      result.should == expected_result
    end
  end
end