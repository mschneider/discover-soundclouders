$(function(){
  RecommendedUserView = Backbone.View.extend({
    initialize: function() {
      this.details = new UserDetailsView({
        id: 'user-details',
        model: this.model
      });
      this.tracklist = new UserTracklistView({
        id: 'user-tracklist',
        model: this.model
      });
      this.recommenders = new UserRecommendersView({
        id: 'user-recommenders',
        model: this.model
      })
      $(this.el).append(this.details.render().el);
      $(this.el).append(this.tracklist.render().el);
      $(this.el).append(this.recommenders.render().el);
    }
  }); 
});