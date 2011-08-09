$(function(){
  UserTracklistTabsView = Backbone.View.extend({
    className: 'graved',
    tagName: 'p',
    
    initialize: function() {
      this.tracks = UserTracklistTabView.build(this.model, 'Tracks');
      this.favorites = UserTracklistTabView.build(this.model, 'Favorites');
      $(this.el).append(this.tracks.render().el);
      $(this.el).append(this.favorites.render().el);
      var that = this;
      this.model.bind('change:tracklistName', function() {that.render();})
    },
    
    render: function() {
      this.tracks.render();
      this.favorites.render();
      return this;
    }
  }); 
});