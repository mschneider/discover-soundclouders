$(function(){
  DisplayedPlaylistController = Backbone.Model.extend({
    
    initialize: function() {
      this.set({
        playlist: new Playlist()
      });
    },
    
    play: function(index) {
      console.log('controller play', index)
      App.player.switchPlaylistAndTrack(this.get('playlist'), index);
      App.player.set({play_status: 'playing'});
    }
  });
});