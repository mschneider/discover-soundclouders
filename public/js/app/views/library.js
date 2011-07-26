$(function(){
  LibraryView = Backbone.View.extend({
    events: {
      'mouseup' : 'mouseUp'
    },
    
    initialize: function() {
      this.controller = this.model;
    },
    
    mouseUp: function() {
      this.controller.mouseUpOnLibrary();
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