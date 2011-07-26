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
        var item = this.get('items').at(i);
        item.set({
          index: i,
          formatted_time: this.formatTime(item)
        });
      }
    },
      
    formatTime: function(item) {
      var duration = Math.floor(item.get('duration') / 1000);
      var hours = Math.floor(duration / 3600),
          minutes = Math.floor((duration / 60) % 60),
          seconds = duration % 60;
      var result = '';
      if (hours > 0)
        result += hours + ':';
      if (minutes > 0 || hours > 0) {
        if (hours > 0 && minutes < 10)
          result += '0';
        result += minutes + ':';
        if (seconds < 10)
          result += '0';
      }
      result += seconds;
      return result;
    },
    
    moveTrack: function(source, destination) {
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
    
    addPlaylistWithName: function(playlistItems, playlistName, playlistIsEditable) {
      this.add(new Playlist({
          items: new PlaylistItemList(playlistItems),
          name: playlistName,
          editable: playlistIsEditable
      }));
    }
  })
});