require File.expand_path(File.join(File.dirname(__FILE__),'/spec_helper'))

describe 'SoundcloudProxy' do
  def app
    @app ||= Sinatra::Application
  end
  
  describe 'GET /' do
    it 'should redirect new users to /login' do
      get '/'
      last_response.should be_redirected_to 'http://example.org/login'
    end
  end
  
  describe 'GET /me/followings' do
    it 'should return an error for unauthorized users' do
      get '/me/followings'
      last_response.should be_client_error
    end
    
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
      get '/me/followings', {}, {'rack.session'=>{'soundcloud'=>{}}}
      last_response.should be_ok
      last_response.body.should == followings.to_json
    end
  end
  
  describe 'GET /me/recommended/:id' do   
    it 'should return an error for unauthorized users' do
      get '/me/recommended/1'
      last_response.should be_client_error
    end
    
    it "should return the current user's recommendations based on the given user" do
      get '/me/rocommended/stubid'
      last_response.should be_ok
    end
  end
  
  describe 'GET /login' do
    it 'should redirect to the Soundcloud OAuth connector' do
      Soundcloud.any_instance.should_receive(:authorize_url).and_return('http://stub/a?b=c')
      get '/login'
      last_response.should be_redirected_to 'http://stub/a?b=c&scope=non-expiring'
    end
  end
  
  describe 'GET /oauth' do
    it 'should redirect to /' do
      Soundcloud.any_instance.stub(:exchange_token)
      Soundcloud.any_instance.stub(:options).and_return({})
      get '/oauth'
      last_response.should be_redirected_to 'http://example.org/'
    end
    
    it 'should request tokens based on parameters from Soundcloud' do
      Soundcloud.any_instance.should_receive(:exchange_token).with(:code => 'stub_code')
      Soundcloud.any_instance.stub(:options).and_return({})
      get '/oauth', {:code => 'stub_code'}
      last_response.should_not be_an_error
    end
  end
end