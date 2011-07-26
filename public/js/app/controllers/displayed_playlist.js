$(function(){
  DisplayedPlaylistController = Backbone.Model.extend({
    
    initialize: function() {
      this.set({selected: new PlaylistItemList()});
      this.display(new Playlist());
    },
    
    click: function(target, modifierPressed) {
      if (target.get('selected')) {
        this.deselectAll();
        this.play(target);
      } else {
        if (modifierPressed) {
          this.selectAdditionally(target);
        } else {
          this.selectOnly(target);
        }
      }
    },
    
    deselectAll: function() {
      this.get('selected').forEach(function(item) {
        item.set({selected: false});
      });
      this.set({selected: new PlaylistItemList()});
    },
    
    display: function(newPlaylist) {
      this.deselectAll();
      this.set({playlist: newPlaylist})
    },
    
    drag: function(sourceItem, destinationItem) {
      this.get('playlist').moveTrack(sourceItem, destinationItem);
    },    
    
    play: function(item) {
      App.player.switchPlaylistAndTrack(this.get('playlist'), item.get('index'));
      App.player.set({play_status: 'playing'});
    },
    
    selectAdditionally: function(item) {
      item.set({selected: true});
      this.get('selected').add(item);
    },
    
    selectOnly: function(item) {
      this.deselectAll();
      item.set({selected: true});
      this.set({selected: new PlaylistItemList([item])});   
    }
  });
});