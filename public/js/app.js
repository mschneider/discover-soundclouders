$(function(){
  App = {
    client_id: '821291bd3a5529686cc0067b4189b409',
    player: new PlayerController(),
    displayedPlaylist: new DisplayedPlaylistController(),
    playlistSelection: new PlaylistSelectionController()
  };
  // views
  var playerView = new PlayerView({
    model: App.player,
    el: $('div#player_view')
  });
  var playlistTracksView = new PlaylistTracksView({
    model: App.displayedPlaylist,
    el: $('div#playlist_view')
  }).render();
  var playlistSelectionView = new PlaylistSelectionView({
    model: App.playlistSelection,
    el: $('div#playlist_selection_view')
  }).render();
  // misc
  User.fromPermalink('mountkimbie', function(user) {
    App.playlistSelection.get('users').add(user)
  });
  User.fromPermalink('rabenkind', function(user) {
    App.playlistSelection.get('users').add(user)
  });
  App.playlistSelection.addSearch('Scuba vs SCB Resident Advisor Mix');
});