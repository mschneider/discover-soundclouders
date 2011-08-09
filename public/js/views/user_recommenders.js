$(function(){
  UserRecommendersView = Backbone.View.extend({
    initialize: function() {
      this.template = Handlebars.compile($("#user-recommenders-template").html());
      var that = this;
      this.model.bind('change:displayedUser', function(model, user) {
        var recommenders = user.get('recommenders');
        if (recommenders) {
          recommenders.each(function(recommender) {
            recommender.bind('change', function() {
              that.render();
            });
          });
        }
        that.render();
      });
    },
    
    render: function() {
      var user = this.model.get('displayedUser');
      if (user) {
        var recommenders = user.get('recommenders');
        if (recommenders) {
          $(this.el).html(this.template({users: recommenders.toJSON()}));
        }
      }
      return this;
    }
  }); 
});