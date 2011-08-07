$(function(){
  App = new (Backbone.Model.extend({
    APIKey: '6c574a63595f5f55c82cd58f945f932a',
    
    selectTab: function(name) {
      var tracklist = TrackList.build(this.get('recommendedUser'), name);
      this.set({
        selectedTab: name,
        displayedTracks: tracklist
      });
    },
    
    start: function(recommendedUsers) {
      this.set({
        recommendedUser: recommendedUsers[0]
      });
      this.selectTab('Tracks');
    },
    
    urlPostfix: function() {
      return '.json?client_id=' + this.APIKey;
    }
  }))();
  
  $.get('/recommendations.json', function(recommendations) {
    console.log('received:', recommendations);
    var recommendedUsers = _(recommendations).map(function(recommended) {
      return new User(recommended);
    });
    App.start(recommendedUsers);
    console.log('initialization finshed.');
  });
  
  new RecommendedUserView({
    el: $('div#recommended-user'),
    model: App
  });
  console.log('views built.');
})