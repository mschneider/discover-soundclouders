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
      File.should_receive(:read).with(File.join('public', 'index.html')).and_return(file_contents)
      get_with_session '/'
      last_response.body.should == file_contents
      last_response.should be_ok
    end
  end
 
  describe 'GET /login' do
    it 'should redirect to the Soundcloud OAuth connector' do
      get '/login'
      last_response.should be_redirect
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
      before :each do
        @current_user = Soundcloud::HashResponseWrapper.new({
          :followings_count => 100,
          :id => 'stubid'
        })
        Soundcloud.any_instance.should_receive(:get).with('/me').and_return(@current_user)
      end
      
      it "should return the current user's recommendations if possible" do
        recommendations = {:something => 1}
        SoundcloudCache.should_receive(:recommendations).with(@current_user).and_return(recommendations)
        get_with_session '/me/recommendations'
        last_response.body.should == recommendations.to_json
        last_response.should be_ok
      end
      
      describe "if the current user's recommendations can not be fetched" do
        before :each do 
          SoundcloudCache.should_receive(:recommendations).with(@current_user).and_return(nil)
        end
        
        it 'should return Accepted' do
          get_with_session '/me/recommendations'
          last_response.status == 202
        end
        
        it "should add the user's id to the JobQueue" do
          JobQueue.should_receive(:push_recommendations).with(@current_user)
          get_with_session '/me/recommendations'        
        end
      end
    end
  end
  
  describe 'GET /recommendations/:id' do
    before :each do
      @user = Soundcloud::HashResponseWrapper.new({
        :followings_count => 100,
        :id => 'stubid'
      })
      Soundcloud.any_instance.should_receive(:get).with("/users/#{@user.id}").and_return(@user)
      @request_url = "/recommendations/#{@user.id}"
    end
    
    it "should return the user's recommendations" do
      recommendations = {:something => 1}
      SoundcloudCache.should_receive(:recommendations).with(@user).and_return(recommendations)
      get @request_url
      last_response.body.should == recommendations.to_json
      last_response.should be_ok
    end
    
    describe "if the user's recommendations can not be fetched" do
      before :each do 
        SoundcloudCache.should_receive(:recommendations).with(@user).and_return(nil)
      end
      
      it 'should ' do
        get @request_url
        last_response.status == 202
      end
      
      it "should add the user's id to the JobQueue" do
        JobQueue.should_receive(:push_recommendations).with(@user)
        get @request_url
      end
    end
  end
  
  describe 'PUT /recommendations/:id' do
    it 'returns an error for non-workers' do
      put '/recommendations/:id'
      last_response.should be_error
    end
    
    describe 'for workers' do
      before :each do
        @id = 'id'
        @url = "/recommendations/#{@id}?worker_key=#{ENV['WORKER_KEY']}"
      end
      
      it 'should return an error if the body is invalid json' do
        SoundcloudCache::RecommendationsCache.any_instance.should_not_receive(:put)
        put @url, '["key":"value]'
        last_response.should be_error
      end
      
      it 'should store the body if it is valid json' do
        data = {'key' => 'value'}
        SoundcloudCache::RecommendationsCache.any_instance.should_receive(:put).with(@id, data)
        put @url, data.to_json
        last_response.status.should == 201
      end
    end
  end
  
  describe 'GET jobs' do
    it 'returns an error for non-workers' do
      get '/job'
      last_response.should be_error
    end
    
    describe 'for workers' do
      before :all do
        @params = { :worker_key => ENV['WORKER_KEY'] }
      end
    
      it 'should return nothing if no jobs are queud' do
        JobQueue.should_receive(:pop).and_return(nil)
        get '/job', @params
        last_response.status.should == 204
      end
    
      it 'should remove the first job from the queue and return it' do
        job = {:stub => 1}
        JobQueue.should_receive(:pop).and_return(job)
        get '/job', @params
        last_response.body.should == job.to_json
        last_response.should be_ok
      end
    end
  end
end