$(function(){
  App = {
    client_id: '821291bd3a5529686cc0067b4189b409',
    player: new PlayerController(),
    displayedPlaylist: new DisplayedPlaylistController(),
    playlistSelection: new PlaylistSelectionController()
  };
  var playerView = new PlayerView({
    model: App.player,
    el: $('div#player_view')
  });
  var playlistView = new PlaylistView({
    model: App.displayedPlaylist,
    el: $('div#playlist_view')
  }).render();
  var playlistSelectionView = new PlaylistSelectionView({
    model: App.playlistSelection,
    el: $('div#playlist_selection_view')
  }).render();
  App.playlistSelection.addSearch('rabenkind');
});