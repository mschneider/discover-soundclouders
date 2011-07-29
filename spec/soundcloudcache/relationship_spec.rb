require File.expand_path(File.join(File.dirname(__FILE__), '..', '/spec_helper'))

describe SoundcloudCache::Relationship do
  before :all do
    SoundcloudCache.options[:expiration_period] = @period = 60
  end
  
  it 'should expire after the given period' do
    relationship = SoundcloudCache::Relationship.new
    Timecop.freeze(Time.now + @period + 1)
    relationship.should be_expired
    Timecop.return
  end
  
  it 'should not expire in the given period' do
    relationship = SoundcloudCache::Relationship.new
    Timecop.freeze(Time.now + @period - 1)
    relationship.should_not be_expired
    Timecop.return
  end  
end