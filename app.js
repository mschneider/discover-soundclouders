$(function(){
  var item1 = new PlaylistItem({
    'id': 7864152,
    'index': 0,
    'title': 'Larry Heard - Deja Vu ( Musaria Mix )',
    'stream_url': 'https://api.soundcloud.com/tracks/7864152/stream'
  });
  var item2 = new PlaylistItem({
    'id': 18314454,
    'index': 1,
    'title': 'Vertical (SCB Edit)',
    'stream_url': 'https://api.soundcloud.com/tracks/18314454/stream'
  });
  var itemList1 = new PlaylistItemList([item1, item2]);
  itemList2 = new PlaylistItemList([{
    "id": 18762110,
    "title": "Freaks and 012 - Conscious (Henrik Schwarz Remix - Re.You Edit)",
    "stream_url": "https://api.soundcloud.com/tracks/18762110/stream"
  }, {
    "id": 18061970,
    "title": "lady&bird_Suicide is painless_niconé edit",
    "stream_url": "https://api.soundcloud.com/tracks/18061970/stream"
  }]);
  var playlist1 = new Playlist({items: itemList1});
  var playlist2 = new Playlist({items: itemList2});
  
  App = {client_id: '821291bd3a5529686cc0067b4189b409'};
  App.player = new PlayerController();
  var playerView = new PlayerView({
    model: App.player,
    el: $('div#player_view')
  });
  App.player.switchPlaylistAndTrack(playlist1, 0);
  App.displayedPlaylist = new DisplayedPlaylistController();
  var playlistView = new PlaylistView({
    model: App.displayedPlaylist,
    el: $('div#playlist_view')
  });
  App.displayedPlaylist.set({playlist: playlist2});
});