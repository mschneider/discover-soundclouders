class SoundcloudCache
  class Connection
    include HTTParty
    base_uri 'api.soundcloud.com'
  
    def collect(path, params)
      result = []
      response = self.class.get(path, {:query => params})
      while response.success? && !response.empty? do
        result += response
        params[:offset] += params[:limit]
        response = self.class.get(path, {:query => params})
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

    def get(id, relationship)
      collect("/users/#{id.to_s}/#{relationship.to_s}.json", default_params)
    end
  end
end