$(function(){
  UserRecommendersView = Backbone.View.extend({
    initialize: function() {
      this.controller = this.model;
      this.template = Handlebars.compile($("#user-recommenders-template").html());
      var that = this;
      this.controller.bind('change:displayedUser', function(c, user) {
        var recommenders = user.get('recommenders');
        if (recommenders) {
          recommenders.each(function(recommender) {
            recommender.bind('change', function() {
              that.render(recommenders);
            });
          });
          that.render(recommenders);
        }
      });
    },
    
    render: function(userlist) {
      $(this.el).html(this.template({users: userlist.toJSON()}));
      return this;
    }
  }); 
});