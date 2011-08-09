$(function(){
  App = new ApplicationController({ APIKey: '6c574a63595f5f55c82cd58f945f932a' });
  Player = new PlayerController();
  
  $.get('/recommendations.json', function(recommendations) {
    console.log('received:', recommendations);
    App.start(new UserList(recommendations));
    console.log('initialization finshed.');
  });

  new HeaderView({ el: $('#header'), model: App });
  new PlayerView({ el: $('#player'), model: Player });
  new RecommendedUserView({ el: $('#recommended-user'), model: App });
  console.log('views built.');
})