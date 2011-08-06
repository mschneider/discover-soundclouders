class SoundcloudCache
  class RecommendationsCache < BaseCache
    
    def fetch my_id
      my_followings = SoundcloudCache.followings my_id
      my_followings_ids = my_followings.map { |f| f[:id] }
      importance_by_id = Hash.new 0
      recommendations = []
      for following in my_followings do
        puts "#{following[:permalink]}:#{following[:id]} is searched for new candidates"
        for candidate in SoundcloudCache.followings following[:id] do
          if (my_id != candidate[:id]) && (!my_followings_ids.include? candidate[:id])
            importance_by_id[candidate[:id]] += 1 / candidate[:popularity]
            recommendations.push({
              :by_whom => following[:id],
              :who => candidate[:id],
              :weight => 1 / candidate[:popularity]
            }) 
          end
        end
      end
      # sort by importance
      importance_by_id = importance_by_id.sort {|a,b| a[1] <=> b[1]}
      # get the ids of the 20 most important candidates
      selected_candidate_ids = importance_by_id.last(20).map {|a| a[0]}
      CacheEntry.new.replace recommendations.select {|r| selected_candidate_ids.include? r[:who]}
    end
  end
end