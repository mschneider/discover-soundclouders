require File.expand_path(File.join(File.dirname(__FILE__), '..', '/spec_helper'))

describe SoundcloudCache::Connection do
  it 'should collect all items from a paginated ressource' do
    def uri(offset)
      "http://api.soundcloud.com/users/id/followings.json?client_id=#{SoundcloudCache.options[:client_id]}&limit=200&offset=#{offset}"
    end
    stub1 = {'title1' => 'bla'}
    stub2 = {'title2' => 'bla'}
    FakeWeb.register_uri(:get, uri(0), :body => [stub1].to_json, :content_type => "application/json")
    FakeWeb.register_uri(:get, uri(200), :body => [stub2].to_json, :content_type => "application/json")
    FakeWeb.register_uri(:get, uri(400), :body => [].to_json, :content_type => "application/json")
    SoundcloudCache::Connection.new.get(:id, :followings).should == [stub1,stub2]
  end  
end