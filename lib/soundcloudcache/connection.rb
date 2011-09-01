class SoundcloudCache
  class Connection
    
    def initialize
      @free_connections = 40
      @waiters = []
    end
  
    def get(id, relationship)
      collect("/users/#{id.to_s}/#{relationship.to_s}.json", default_params)
    end
    
    private
    
    def collect path, params
      result = []
      response = fetch path, params
      while !response.empty? do 
        result += response
        params[:offset] += params[:limit]
        response = fetch path, params
      end
      result.uniq
    end
    
    def default_params
      {
        :client_id => SoundcloudCache.options[:client_id],
        :limit => 200,
        :offset => 0
      }
    end
    
    def fetch path, params
      begin
        response = request(path, params)
        result = RelationshipParser.parse response
        response.clear
        return result
      rescue
        puts "exception detected: #{$!}"
        retry
      end
    end
    
    def request path, params
      if @free_connections > 0 then
        @free_connections -= 1
        begin
          client = EM::HttpRequest.new('http://api.soundcloud.com' + path).get({ :query => params })
          return client.response
        ensure
          @free_connections += 1
          if waiter = @waiters.shift then
            waiter.resume
          end
        end
      else
        @waiters << Fiber.current
        Fiber.yield
        request path, params #aka retry
      end
    end
  end
end
