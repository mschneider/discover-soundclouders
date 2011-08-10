require File.expand_path(File.join(File.dirname(__FILE__),'/spec_helper'))

describe 'SoundcloudCache' do
  before :all do
    @user = :stub
  end
  
  [:followers, :followings, :recommendations].each do |cache_name|
    it "should get entries from its #{cache_name.to_s} cache" do
      SoundcloudCache.instance.caches[cache_name].should_receive(:get).with(@user).and_return(:result)
      SoundcloudCache.send(cache_name, @user).should == :result
    end
  end
  
  it 'should return nil when accessing unknown caches' do
    SoundcloudCache.instance.get(:unknown, @user).should be_nil
  end
end