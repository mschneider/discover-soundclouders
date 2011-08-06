require File.expand_path(File.join(File.dirname(__FILE__),'/spec_helper'))

describe 'SoundcloudProxy' do
  def app
    @app ||= Sinatra::Application
  end
  
  def get_with_session url
    get url, {}, {'rack.session'=>{'soundcloud'=>{}}}
  end
  
  before :all do
    @base_url = 'http://example.org'
  end
  
  describe 'GET /' do
    it 'should redirect new users to /login' do
      get '/'
      last_response.should be_redirected_to "#{@base_url}/login"
    end
    
    it 'should deliver the index.html page to logged in users' do
      file_contents = "stub"
      File.should_receive(:read).with(File.join('public', 'index.html')).and_return(response)
      get_with_session '/'
      last_response.body.should == file_contents
      last_response.should be_ok
    end
  end
 
  describe 'GET /login' do
    it 'should redirect to the Soundcloud OAuth connector' do
      connector_url = 'http://stub/a?b=c'
      Soundcloud.any_instance.should_receive(:authorize_url).and_return(connector_url)
      get '/login'
      last_response.should be_redirected_to connector_url
    end
  end
  
  describe 'GET /oauth' do
    before :each do
      Soundcloud.any_instance.stub(:options).and_return({})
    end
    
    it 'should redirect to /' do
      Soundcloud.any_instance.stub(:exchange_token)
      get '/oauth'
      last_response.should be_redirected_to "#{@base_url}/"
    end
    
    it 'should request tokens based on parameters from Soundcloud' do
      params = {:code => 'stub_code'}
      Soundcloud.any_instance.should_receive(:exchange_token).with(params)
      get '/oauth', params
      last_response.should_not be_an_error
    end
  end

  describe 'GET /me' do
    ['', '/followings', '/recommendations'].each do |path|
      it "#{path} should return an error for unauthorized users" do
        get "/me#{path}"
        last_response.should be_client_error
      end
    end
    
    it 'should return the current user' do
      current_user = Soundcloud::HashResponseWrapper.new({:id => 'stubid'})
      Soundcloud.any_instance.should_receive(:get).with('/me').and_return(current_user)
      get_with_session '/me'
      last_response.body.should == current_user.to_json
      last_response.should be_ok
    end
    
    describe '/followings' do
      it "should return the current user's followings as json" do
        current_user = Soundcloud::HashResponseWrapper.new({:id => 'stubid'})
        followings = Soundcloud::ArrayResponseWrapper.new [{:stub => 1}]
        Soundcloud.any_instance.should_receive(:get).twice do |url|
          case url
          when '/me'
            current_user
          when '/users/stubid/followings'
            followings
          end
        end
        get_with_session '/me/followings'
        last_response.body.should == followings.to_json
        last_response.should be_ok
      end
    end

    describe '/recommendations' do
      it "should return the current user's recommendations" do
        current_user = Soundcloud::HashResponseWrapper.new({:id => 'stubid'})
        Soundcloud.any_instance.should_receive(:get).with('/me').and_return(current_user)
        recommendations = {:stub => 1}
        SoundcloudCache.should_receive(:recommendations).with(current_user[:id]).and_return(recommendations)
        get_with_session '/me/recommendations'
        last_response.body.should == recommendations.to_json
        last_response.should be_ok
      end
    end

  end
end