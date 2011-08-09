$(function(){
  Recommendations = new ApplicationController();
  $.ajax({
    url: '/me/recommendations',
    tryCount: 0,
    retryLimit: 60,
    success: function(recommendations) {
      Recommendations.set({ recommendedUsers: new UserList(JSON.parse(recommendations)) });
      Recommendations.display(0);
      $('body').empty();
      _(Views).each(function(view) {
        $('body').append(view.el);
      });
    },
    error: function() {
      if (this.tryCount <= this.retryLimit) {
        this.tryCount++;
        $.ajax(this);
      } else {
        $('body p').html('Something seems to be wrong. Please try again later.');
      }
    }
  });
  
  Player = new PlayerController();
  Views = [
    new HeaderView({ id: 'header', model: Recommendations }),
    new PlayerView({ id: 'player', model: Player }),
    new UserDetailsView({ id: 'user-details', model: Recommendations }),
    new UserTracklistView({ id: 'user-tracklist', model: Recommendations }),
    new UserRecommendersView({ id: 'user-recommenders', model: Recommendations })
  ];
})