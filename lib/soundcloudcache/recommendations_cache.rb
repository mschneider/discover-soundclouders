class SoundcloudCache
  class RecommendationsCache < BaseCache
    
    private
    
    def build_result importance_by_id, recommenders_by_id
      # sort by importance
      importance_by_id = importance_by_id.sort {|a,b| a[1] <=> b[1]}
      # get the ids of the 30 most important candidates
      selected_candidate_ids = importance_by_id.last(30).map {|a| a[0]}
      result = selected_candidate_ids.map do |candidate_id|
        recommender_ids = recommenders_by_id[candidate_id].map { |id| { :id => id } }
        {
          :id => candidate_id,
          :recommenders => recommender_ids.uniq
        }
      end
      CacheEntry.new.replace result
    end
    
    def compute_candidates user, user_followings_ids, following, importance_by_id, recommenders_by_id
      for candidate in SoundcloudCache.followings following do
        if (user[:id] != candidate[:id]) && (!user_followings_ids.include? candidate[:id]) then
          popularity = 1 + Math.log(candidate[:followers_count], 5)
          importance_by_id[candidate[:id]] += 1 / popularity
          recommenders_by_id[candidate[:id]] += [following[:id]]
        end
      end
    end
    
    def fetch user
      user_followings = SoundcloudCache.followings user
      user_followings_ids = user_followings.map {|f| f[:id]}
      importance_by_id = Hash.new 0
      recommenders_by_id = Hash.new {[]}
      fibers_running = 0
      for following in user_followings do
        f = Fiber.new do |following|
          compute_candidates user, user_followings_ids, following, importance_by_id, recommenders_by_id
          fibers_running -= 1
        end
        fibers_running += 1
        f.resume following
      end
      while fibers_running > 0 do
        EM::Synchrony::sleep 1
      end
      build_result importance_by_id, recommenders_by_id
    end

    def should_fetch? user
      user[:followings_count] < 1000
    end
  end
end
