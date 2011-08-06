require File.expand_path(File.join(File.dirname(__FILE__),'/spec_helper'))

describe 'SoundcloudCache' do
  [:followers, :followings, :recommendations].each do |cache_name|
    it "should get entries from its #{cache_name.to_s} cache" do
      SoundcloudCache.instance.caches[cache_name].should_receive(:get).with(:stubid).and_return(:result)
      SoundcloudCache.send(cache_name, :stubid).should == :result
    end
  end
  
  it 'should return nil when accessing unknown caches' do
    SoundcloudCache.instance.get(:unknown, :stubid).should be_nil
  end
end