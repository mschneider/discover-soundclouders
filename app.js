$(function(){
  App = {client_id: '821291bd3a5529686cc0067b4189b409'};
  App.player = new PlayerController();
  var playerView = new PlayerView({
    model: App.player,
    el: $('div#player_view')
  });
  App.displayedPlaylist = new DisplayedPlaylistController();
  var playlistView = new PlaylistView({
    model: App.displayedPlaylist,
    el: $('div#playlist_view')
  });
  App.displayedPlaylist.soundcloudSearch('rabenkind');
});