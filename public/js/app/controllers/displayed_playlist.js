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
    },

    mouseDownOn: function(item) {
      this.set({lastDownOn: item});
    },

    mouseUpOn: function(dragTarget, modifierPressed) {
      var dragSource = this.get('lastDownOn');
      if (dragSource != dragTarget)
        this.get('playlist').moveTrack(dragSource, dragTarget);
      else // mouse did not move - was a regular click
        this.click(dragTarget, modifierPressed);
    }
  });
});