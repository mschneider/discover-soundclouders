$(function(){
  Recommendations = new ApplicationController();
  $.get('/recommendations.json', function(recommendations) {
    Recommendations.set({ recommendedUsers: new UserList(recommendations) });
    Recommendations.display(0);
    $('body').empty();
    _(Views).each(function(view) {
      $('body').append(view.el);
    });
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