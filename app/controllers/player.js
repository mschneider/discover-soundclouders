$(function(){
  PlayerController = Backbone.Model.extend({
    
    initialize: function() {
      this.set({
        play_status: 'stopped',
        playlist: new Playlist()
      });
      this.switchTrack(0);
    },
    
    togglePlayPause: function(){
      var wasPlaying = (this.get('play_status') == 'playing');
      if (wasPlaying) {
        this.set({play_status: 'paused'});
      } else {
        this.set({play_status: 'playing'});
      }
    },
    
    switchPlaylistAndTrack: function(newPlaylist, newIndex) {
      this.set({playlist: newPlaylist});
      this.switchTrack(newIndex);
    },
    
    switchTrack: function(newIndex) {
      var playlistItems = this.get('playlist').get('items');
      var oldStatus = this.get('play_status');
      this.set({play_status: 'stopped'});
      if (newIndex >= playlistItems.length || newIndex < 0) {
        this.set({
          playlist_index: 0,
          current_track: null
        }); // play_status already stopped
      } else {
        this.set({
          playlist_index: newIndex,
          current_track: playlistItems.at(newIndex)
        });
        this.set({play_status: oldStatus}); // explicit order of execution 
      }
    },
    
    skipForward: function(){
      var newIndex = this.get('playlist_index') + 1;
      this.switchTrack(newIndex);
    },
    
    skipBackward: function(){
      var newIndex = this.get('playlist_index') - 1;
      this.switchTrack(newIndex);
    }
  });
});