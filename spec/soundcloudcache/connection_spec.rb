require File.expand_path(File.join(File.dirname(__FILE__), '..', '/spec_helper'))

describe SoundcloudCache::Connection do
  it 'should collect all items from a paginated ressource' do
    def options(i)
      {
        :path => '/users/stub/followings.json',
        :query => {
          :client_id => SoundcloudCache.options[:client_id],
          :limit => 200,
          :offset => 200 * i
        }
      }
    end
    @responses = [[{'id' => 1}], [{'id' => 2}], []]
    def connection_double(i)
      connection = double("Connection#{i}")
      client = double("Client#{i}")
      client.should_receive(:response).and_return(@responses[i].to_json)
      connection.should_receive(:get).with(options(i)).and_return(client)
      connection
    end
    connections = [connection_double(0), connection_double(1), connection_double(2)]
    EM::HttpRequest.should_receive(:new).exactly(3).times do |url|
      url.should == 'http://api.soundcloud.com'
      connections.shift
    end
    SoundcloudCache::Connection.new.get(:stub, :followings).should == (@responses[0] + @responses[1])
  end  
end