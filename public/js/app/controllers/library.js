$(function(){
  LibraryController = Backbone.Model.extend({
    
    initialize: function() {
      this.resetState();
    },
    
    mouseDownOnPlaylistItem: function(item) {
      var that = this;
      this.currentTimeOut = setTimeout(function() {
        that.startDragging(item);
      }, 200);
    },

    mouseUpOnLibrary: function() {
      clearTimeout(this.currentTimeOut);
      switch (this.get('state')) {
          case 'dragging':
            console.log(this.get('dragged'), 'dragged on library');
            this.resetState();
            break;
        }
    },
    
    mouseUpOnPlaylistItem: function(item, modifierPressed) {
      clearTimeout(this.currentTimeOut);
      switch (this.get('state')) {
        case 'normal': 
          App.displayedPlaylist.click(item, modifierPressed);
          break;
        case 'dragging':
          App.displayedPlaylist.drag(this.get('dragged'), item);
          this.resetState();
          break;
      }
    },

    mouseUpOnPlaylistName: function(playlist) {
      clearTimeout(this.currentTimeOut);
      switch (this.get('state')) {
        case 'normal': 
          App.displayedPlaylist.display(playlist);
          break;
        case 'dragging':
          console.log(this.get('dragged'), 'dragged on playlistname', playlist);
          this.resetState();
          break;
      }
    },
    
    resetState: function() {
      this.set({
        state: 'normal',
        dragged: null
      });
    },
    
    startDragging: function(item) {
      this.set({
        state: 'dragging',
        dragged: item
      });
    }
  
  });
});