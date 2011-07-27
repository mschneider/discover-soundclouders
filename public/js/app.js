$(function(){
  App = {
    client_id: '6c574a63595f5f55c82cd58f945f932a',
    player: new PlayerController(),
    library: new LibraryController(),
    displayedPlaylist: new DisplayedPlaylistController(),
    playlistSelection: new PlaylistSelectionController()
  };

  var playerView = new PlayerView({
    model: App.player,
    el: $('div#player_view')
  });
  var libraryView = new LibraryView({
    model: App.library,
    el: $('div#library_view')
  }).render();

  User.fromPermalink('mountkimbie', function(user) {
    App.playlistSelection.get('users').add(user);
  });
  User.fromPermalink('rabenkind', function(user) {
    App.playlistSelection.get('users').add(user);
  });
  App.playlistSelection.addSearch('Scuba vs SCB');
});