$(function(){
  PlaylistItem = Backbone.Model.extend({
    
  });
  
  PlaylistItemList = Backbone.Collection.extend({
    model: PlaylistItem,
    
    comparator: function(item) {
      return item.get('index');
    }
  });
  
  PlaylistItemList.formatTime = function(duration) {
    var hours = Math.floor(duration / 3600),
        minutes = Math.floor((duration / 60) % 60),
        seconds = Math.floor(duration % 60),
        result = '';
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
  };
  
  PlaylistItemList.fromSoundcloud = function(items){
    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      item.index = i;
      item.formatted_time = this.formatTime(item.duration / 1000);
    }
    return new PlaylistItemList(items);
  };
  
  Playlist = Backbone.Model.extend({
    
    initialize: function() {
      if (!this.get('items')) {
        this.set({items: new PlaylistItemList});
      }
    },
    
    addTrack: function(item) {
      var newIndex = this.get('items').length;
      item.set({index: newIndex});
      this.get('items').add(item);
    },
    
    addTrackList: function(itemList) {
      itemList.sort({silent: true});
      var that = this;
      itemList.forEach(function(item) {
        that.addTrack(item.clone());
      })
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
      var newPlaylist = new Playlist({
          items: PlaylistItemList.fromSoundcloud(playlistItems),
          name: playlistName,
          editable: playlistIsEditable
      });
      this.add(newPlaylist);
    }
  })
});