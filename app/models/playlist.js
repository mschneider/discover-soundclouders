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
      for (var i = 0; i < this.get('items').length; i += 1) {
        this.get('items').at(i).set({index: i});
      }
    }
  });
  
  PlaylistList = Backbone.Collection.extend({
    model: Playlist
  })
});