require File.expand_path(File.join(File.dirname(__FILE__),'/spec_helper'))

describe 'SoundcloudCache' do
  it 'should get followers from its RelationshipCache' do
    SoundcloudCache.instance.caches[:followers].should_receive(:get).with(:stubid).and_return(:result)
    SoundcloudCache.followers(:stubid).should == :result
  end
  
  it 'should get followings from its RelationshipCache' do
    SoundcloudCache.instance.caches[:followings].should_receive(:get).with(:stubid).and_return(:result)
    SoundcloudCache.followings(:stubid).should == :result
  end
  
  it 'should return nil when accessing unknown Relationships' do
    SoundcloudCache.instance.get(:unknown, :stubid).should be_nil
  end
end