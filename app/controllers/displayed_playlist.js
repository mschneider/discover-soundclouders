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
    },
    
    soundcloudSearch: function(query) {
      var that = this;
      var requestData = {
        client_id: App.client_id,
        filter: 'streamable',
        q: encodeURI(query.replace(/\ /g, '+'))
      };
      $.ajax({
        url: 'http://api.soundcloud.com/tracks.json',
        data: requestData,
        dataType: 'jsonp',
        success: function(tracks) {
          console.log('success', tracks) ;
          that.set({
            playlist: new Playlist({
              items: new PlaylistItemList(tracks)
            })
          });
        },
        error: function() {
          console.error('OUCH! searching', query, 'failed');
        }
      });
    }
  });
});