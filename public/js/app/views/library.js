$(function(){
  LibraryView = Backbone.View.extend({
    
    initialize: function() {
      this.controller = this.model;
    },
    
    render: function() {
      $(this.el).html('');
      var playlistView = new PlaylistView({
        model: App.displayedPlaylist
      });
      var playlistSelectionView = new PlaylistSelectionView({
        model: App.playlistSelection
      });
      $(this.el).append(playlistSelectionView.render().el);
      $(this.el).append(playlistView.render().el);
      return this;
    }
  });
});