class SoundcloudCache
  class RecommendationsCache < BaseCache
    
    private
    
    def fetch user
      user_followings = SoundcloudCache.followings user
      user_followings_ids = user_followings.map {|f| f[:id]}
      importance_by_id = Hash.new 0
      recommenders_by_id = Hash.new {[]}
      for following in user_followings do
        puts "#{following[:permalink]}:#{following[:id]} is searched for new candidates"
        for candidate in SoundcloudCache.followings following do
          if (user[:id] != candidate[:id]) && (!user_followings_ids.include? candidate[:id]) then
            popularity = 1 + Math.log(candidate[:followers_count], 5)
            importance_by_id[candidate[:id]] += 1 / popularity
            recommenders_by_id[candidate[:id]] += [following[:id]]
          end
        end
      end
      # sort by importance
      importance_by_id = importance_by_id.sort {|a,b| a[1] <=> b[1]}
      # get the ids of the 30 most important candidates
      selected_candidate_ids = importance_by_id.last(30).map {|a| a[0]}
      result = []
      for candidate_id in selected_candidate_ids do
        result.push({
          :id => candidate_id,
          :recommenders => recommenders_by_id[candidate_id].map { |id| { :id => id } }
        })
      end
      CacheEntry.new.replace result
    end
    
    def should_fetch? user
      user[:followings_count] < 200
    end
  end
end