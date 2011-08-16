$(function(){
  Recommendations = new ApplicationController();
  
  startLoad = function(recommendationsUrl) {
    $.ajax({
      url: recommendationsUrl,
      tryCount: 0,
      retryLimit: 60, // 30 minutes of 503s
      statusCode: {
        200: function(recommendations) {
          Recommendations.set({ recommendedUsers: new UserList(JSON.parse(recommendations)) });
          Recommendations.display(0);
          $('body').children().detach();
          _(Views).each(function(view) {
            $('body').append(view.el);
          });
        },
        202: function() {
          window.setTimeout(function() {
            startLoad(recommendationsUrl);
          }, 30 * 1000);
        }
      },
      error: function() {
        if (this.tryCount <= this.retryLimit) {
          this.tryCount++;
          $.ajax(this);
        } else {
          $('body > p').html('Something seems to be wrong. Please try again later.');
        }
      }
    });
  };
  startLoad('/me/recommendations');
  
  Player = new PlayerController();
  Views = [
    new HeaderView({ id: 'header', model: Recommendations }),
    new PlayerView({ id: 'player', model: Player }),
    new UserDetailsView({ id: 'user-details', model: Recommendations }),
    new UserTracklistView({ id: 'user-tracklist', model: Recommendations }),
    new UserRecommendersView({ id: 'user-recommenders', model: Recommendations })
  ];
})