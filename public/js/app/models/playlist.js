$(function(){
  PlaylistItem = Backbone.Model.extend({
    
  });
  
  PlaylistItemList = Backbone.Collection.extend({
    model: PlaylistItem,
    
    comparator: function(item) {
      return item.get('index');
    }
  });
  
  Playlist = Backbone.Model.extend({
    
    initialize: function() {
      if (!this.get('items')) {
        this.set({items: new PlaylistItemList});
      }
      for (var i = 0; i < this.get('items').length; i += 1) {
        this.get('items').at(i).set({index: i});
      }
    },
    
    moveTrack: function(source, destination) {
      console.log('model:move', source.get('title'), destination.get('title'));      
      var sourceIndex = source.get('index'), destIndex = destination.get('index');
      this.get('items').select(function(item) {
        return item.get('index') > Math.min(sourceIndex, destIndex) &&
               item.get('index') < Math.max(sourceIndex, destIndex)
      }).forEach(function(item) {
        var newIndex = item.get('index') + (sourceIndex < destIndex ? -1 : 1);
        item.set({index: newIndex});
      });
      if (sourceIndex < destIndex) {
        source.set({index: destIndex});
        destination.set({index: destIndex - 1});
      } else {        
        source.set({index: destIndex});
        destination.set({index: destIndex + 1});
      }
      this.get('items').sort();
    }
  });
  
  PlaylistList = Backbone.Collection.extend({
    model: Playlist,
    
    addPlaylistWithName: function(playlistItems, playlistName) {
      this.add(new Playlist({
          items: new PlaylistItemList(playlistItems),
          name: playlistName
      }));
    }
  })
});