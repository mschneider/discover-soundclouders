$(function(){
  UserTracklistTabsView = Backbone.View.extend({
    className: 'graved',
    tagName: 'p',
    
    initialize: function() {
      this.controller = this.model;
      this.tracks = UserTracklistTabView.build(this.controller, 'Tracks');
      this.favorites = UserTracklistTabView.build(this.controller, 'Favorites');
      $(this.el).append(this.tracks.render().el);
      $(this.el).append(this.favorites.render().el);
      var that = this;
      this.controller.bind('change:tracklistName', function() { that.render(); })
    },
    
    render: function() {
      this.tracks.render();
      this.favorites.render();
      return this;
    }
  }); 
});