$(function(){
  var exampleTracks = [{
    'id': 7864152,
    'created_at': '2010/12/09 12:34:23 +0000',
    'user_id': 1899891,
    'duration': 503649,
    'commentable': true,
    'state': 'finished',
    'sharing': 'public',
    'tag_list': 'larry heard deja vu musaria mix perlon panorma bar',
    'permalink': 'larry-heard-deja-vu-musaria-mix',
    'description': 'seit monaten im kopf nachdem es immer in der PERLONnacht in der pannebar lief, endlich gefunden (danke sammy dee, der mein vorgesungenes erkannt hat...)',
    'streamable': true,
    'downloadable': false,
    'genre': 'bauchkribbeln',
    'release': '',
    'purchase_url': null,
    'label_id': null,
    'label_name': '',
    'isrc': '',
    'video_url': null,
    'track_type': '',
    'key_signature': '',
    'bpm': null,
    'title': 'Larry Heard - Deja Vu ( Musaria Mix )',
    'release_year': null,
    'release_month': null,
    'release_day': null,
    'original_format': 'mp3',
    'license': 'all-rights-reserved',
    'uri': 'https://api.soundcloud.com/tracks/7864152',
    'permalink_url': 'http://soundcloud.com/rabenkind/larry-heard-deja-vu-musaria-mix',
    'artwork_url': 'http://i1.sndcdn.com/artworks-000003501835-521c8p-large.jpg?c08a3c2',
    'waveform_url': 'http://w1.sndcdn.com/U8duURY4GFbs_m.png',
    'user': {
      'id': 1899891,
      'permalink': 'rabenkind',
      'username': 'rabenkind',
      'uri': 'https://api.soundcloud.com/users/1899891',
      'permalink_url': 'http://soundcloud.com/rabenkind',
      'avatar_url': 'http://i1.sndcdn.com/avatars-000001867495-p2mbkj-large.jpg?c08a3c2'
    },
    'stream_url': 'https://api.soundcloud.com/tracks/7864152/stream',
    'playback_count': 1426,
    'download_count': 22,
    'favoritings_count': 44,
    'comment_count': 0,
    'attachments_uri': 'https://api.soundcloud.com/tracks/7864152/attachments'
  }, {
    'id': 18314454,
    'created_at': '2011/07/03 12:08:26 +0000',
    'user_id': 1570627,
    'duration': 539580,
    'commentable': true,
    'state': 'finished',
    'sharing': 'public',
    'tag_list': '',
    'permalink': 'hfrmx007-02-vertical-scb',
    'description': 'Released on Hotflush Recordings\r\n\r\nhttp://www.mountkimbie.com\r\nhttp://www.myspace.com/mountkimbie\r\nhttp://www.twitter.com/mountkimbie\r\nhttp://www.facebook.com/mountkimbie\r\nhttp://www.youtube.com/user/mountkimbie\r\nhttp://www.last.fm/music/Mount+Kimbie\r\nhttp://www.itunes.com/mountkimbie\r\n',
    'streamable': true,
    'downloadable': false,
    'genre': '',
    'release': '',
    'purchase_url': null,
    'label_id': null,
    'label_name': '',
    'isrc': '',
    'video_url': null,
    'track_type': '',
    'key_signature': '',
    'bpm': null,
    'title': 'Vertical (SCB Edit)',
    'release_year': null,
    'release_month': null,
    'release_day': null,
    'original_format': 'wav',
    'license': 'all-rights-reserved',
    'uri': 'https://api.soundcloud.com/tracks/18314454',
    'permalink_url': 'http://soundcloud.com/mountkimbie/hfrmx007-02-vertical-scb',
    'artwork_url': null,
    'waveform_url': 'http://w1.sndcdn.com/sCfeoZZ1sN8I_m.png',
    'user': {
      'id': 1570627,
      'permalink': 'mountkimbie',
      'username': 'mountkimbie',
      'uri': 'https://api.soundcloud.com/users/1570627',
      'permalink_url': 'http://soundcloud.com/mountkimbie',
      'avatar_url': 'http://i1.sndcdn.com/avatars-000004531609-57bkhn-large.jpg?c08a3c2'
    },
    'stream_url': 'https://api.soundcloud.com/tracks/18314454/stream',
    'playback_count': 396,
    'download_count': 0,
    'favoritings_count': 12,
    'comment_count': 5,
    'attachments_uri': 'https://api.soundcloud.com/tracks/18314454/attachments'
  }];
  
  var Track = Backbone.Model.extend({
    initialize: function() {
      console.log('new Track', this.get('id'))
    }
  });
  
  var Playlist = Backbone.Collection.extend({
    model: Track,
    
    initialize: function() {
      console.log('new Playlist', this.length)
    }
  });
  
  var Player = Backbone.Model.extend({
    initialize: function() {
      this.set({
        play_status: 'stopped',
        playlist: new Playlist([
          new Track(exampleTracks[0]),
          new Track(exampleTracks[1])
        ])
      });
      this.switchTrack(0);
      console.log('new Player', this.get('track').get('stream_url'));
      
    },
    
    togglePlayPause: function(){
      var wasPlaying = (this.get('play_status') == 'playing');
      if (wasPlaying) {
        this.set({play_status: 'paused'});
      } else {
        this.set({play_status: 'playing'});
      }
    },
    
    switchTrack: function(newIndex) {
      this.set({
        playlist_index: newIndex,
        track: this.get('playlist').at(newIndex)
      });
    },
    
    skipForward: function(){
      var newIndex = this.get('playlist_index') + 1;
      var playlist = this.get('playlist');
      if (newIndex >= playlist.length) { // playlist finished
        this.set({
          play_status: 'stopped',
        });
        newIndex = 0;
      }
      this.switchTrack(newIndex);
    },
    
    skipBackward: function(){
      var newIndex = this.get('playlist_index') - 1;
      var playlist = this.get('playlist');
      if (newIndex < 0) { // playlist start reached
        this.set({
          play_status: 'stopped',
        });
        newIndex = 0;
      }
      this.switchTrack(newIndex);
    }
  });
  
  var PlayerView = Backbone.View.extend({
    events: {
      'click #toggle_play_pause': 'togglePlayPause',
      'click #skip_forward': 'skipForward',
      'click #skip_backward': 'skipBackward'
    },
    
    initialize: function() {
      window.player.bind('change:play_status', this.changePlayStatus);
      window.player.bind('change:track', this.changeTrack);
      // refresh binding
      var oldTrack = window.player.get('track');
      window.player.set({track: null});
      window.player.set({track: oldTrack});
      console.log('new PlayerView')
    },
    
    changePlayStatus: function(player, playStatus) {
      var playerTag = $('audio').get(0);
      switch (playStatus) {
        case 'playing':
          playerTag.play();
          $('#toggle_play_pause').text('pause');
          break;
        case 'paused':
          playerTag.pause();
          $('#toggle_play_pause').text('play');
          break;
        case 'stopped':
          playerTag.pause();
          playerTag.currentTime=0;
          $('#toggle_play_pause').text('play');
          break;
      }
    },
    
    changeTrack: function(player, track) {
      if (track) { // bc. of refresh in PlayerView::initialize
        var oldPlayStatus = player.get('play_status');
        var audioSrc = track.get('stream_url') + '?client_id=' + player.get('clientId');
        player.set({play_status: "stopped"}); // should be moved to model
        $('audio').attr('src', audioSrc);
        player.set({play_status: oldPlayStatus}); // should be moved to model
      }
    },
    
    togglePlayPause: function(){
      window.player.togglePlayPause();
    },
    
    skipForward: function(){
      window.player.skipForward();
    },
    
    skipBackward: function(){
      window.player.skipBackward();
    }
  });
  
  window.player = new Player({
    clientId: '821291bd3a5529686cc0067b4189b409'
  });
  window.playerView = new PlayerView({
    el: $('div#player')
  })
});
