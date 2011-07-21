$(function(){
  PlaylistItem = Backbone.Model.extend({
    
  });
  
  PlaylistItemList = Backbone.Collection.extend({
    model: PlaylistItem
    
  });
  
  Playlist = Backbone.Model.extend({
    
    initialize: function() {
      if (!this.get('items')) {
        this.set({items: new PlaylistItemList});
      }
    }
  });
});