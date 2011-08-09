$(function(){
  PlayerController = Backbone.Model.extend({
    defaults: {
      index: 0,
      state: 'stopped',
      playlist: new TrackList()
    },
    
    initialize: function() {
      this.set();
    },
    
    next: function(){
      var newIndex = this.get('index') + 1;
      this.switchTrack(newIndex);
    },
    
    play: function(newPlaylist, newIndex) {
      this.set({playlist: newPlaylist});
      this.switchTrack(newIndex);
    },
    
    switchTrack: function(newIndex) {
      this.set({ state: 'stopped' });
      if (newIndex >= this.get('playlist').length || newIndex < 0) {
        this.set({
          index: 0,
          track: null
        });
      } else {
        this.set({
          index: newIndex,
          track: this.get('playlist').at(newIndex),
          state: 'playing'
        });
      }
    },
    
    togglePlayPause: function(){
      var wasPlaying = (this.get('state') == 'playing');
      if (wasPlaying) {
        this.set({state: 'paused'});
      } else {
        this.set({state: 'playing'});
      }
    }
  });
});