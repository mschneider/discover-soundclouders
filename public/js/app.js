$(function(){
  Recommendations = new ApplicationController();
  Player = new PlayerController();
  
  $.get('/recommendations.json', function(recommendations) {
    Recommendations.set({ recommendedUsers: new UserList(recommendations) });
    Recommendations.display(0);
  });
  
  new HeaderView({ el: $('#header'), model: Recommendations });
  new PlayerView({ el: $('#player'), model: Player });
  new RecommendedUserView({ el: $('#recommended-user'), model: Recommendations });
})