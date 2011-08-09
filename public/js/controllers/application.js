$(function(){
  ApplicationController = Backbone.Model.extend({
    currentRecommendationIndex: function() {
      return this.get('recommendedUsers').indexOf(this.get('recommendedUser'));
    },
    
    nextRecommendation: function() {
      var index = this.currentRecommendationIndex() + 1,
          length = this.get('recommendedUsers').length;
      if (index >= length)
        index -= length;
      this.selectRecommendation(index);
    },
    
    previousRecommendation: function() {      
      var index = this.currentRecommendationIndex() - 1,
          length = this.get('recommendedUsers').length;
      if (index < 0)
        index += length;
      this.selectRecommendation(index);
    },
    
    selectRecommendation: function(index) {
      this.set({recommendedUser: this.get('recommendedUsers').at(index)});
      this.selectTab(this.get('selectedTab') || 'Tracks');
    },
    
    selectTab: function(name) {
      var tracklist = TrackList.build(this.get('recommendedUser'), name);
      this.set({
        selectedTab: name,
        displayedTracks: tracklist
      });
    },
    
    start: function(recommendedUsers) {
      this.set({recommendedUsers: recommendedUsers});
      this.selectRecommendation(0);
    },
    
    urlPostfix: function() {
      return '?client_id=' + this.get('APIKey');
    }
  });
});