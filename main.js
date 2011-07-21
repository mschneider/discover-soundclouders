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
  
  var exampleUsers = [{
    'id': 1899891,
    'permalink': 'rabenkind',
    'username': 'rabenkind',
    'uri': 'https://api.soundcloud.com/users/1899891',
    'permalink_url': 'http://soundcloud.com/rabenkind',
    'avatar_url': 'http://i1.sndcdn.com/avatars-000001867495-p2mbkj-large.jpg?c08a3c2',
    'country': 'Germany',
    'full_name': '',
    'city': 'Berlin',
    'description': null,
    'discogs_name': null,
    'myspace_name': null,
    'website': null,
    'website_title': null,
    'online': false,
    'track_count': 9,
    'playlist_count': 1,
    'public_favorites_count': 238,
    'followers_count': 24,
    'followings_count': 13
  }, {
    'id': 1570627,
    'permalink': 'mountkimbie',
    'username': 'mountkimbie',
    'uri': 'https://api.soundcloud.com/users/1570627',
    'permalink_url': 'http://soundcloud.com/mountkimbie',
    'avatar_url': 'http://i1.sndcdn.com/avatars-000004531609-57bkhn-large.jpg?c08a3c2',
    'country': 'Britain (UK)',
    'full_name': 'Mount Kimbie',
    'city': 'London',
    'description': 'MOUNT KIMBIE\r\nhttp://www.mountkimbie.com\r\nhttp://www.myspace.com/mountkimbie\r\nhttp://www.twitter.com/mountkimbie\r\nhttp://www.facebook.com/mountkimbie\r\nhttp://www.youtube.com/user/mountkimbie\r\nhttp://www.last.fm/music/Mount+Kimbie\r\nhttp://www.itunes.com/mountkimbie\r\n\r\n',
    'discogs_name': null,
    'myspace_name': 'mountkimbie',
    'website': 'http://www.mountkimbie.com',
    'website_title': '',
    'online': false,
    'track_count': 34,
    'playlist_count': 7,
    'public_favorites_count': 0,
    'followers_count': 4986,
    'followings_count': 0
  }];
  
  var Track = Backbone.Model.extend({
    initialize: function() {
      console.log('new Track', this.get('id'))
    }
  });
  
  var PlaylistItem = Backbone.Model.extend({
    initialize: function() {
      console.log('new PlaylistItem', this.get('index'), this.get('track').get('id'));
    }
  }); // TODO: refactor into real mode
  
  
  var Playlist = Backbone.Collection.extend({
    model: PlaylistItem,
    initialize: function() {
      console.log('new Playlist', this.length)
    }
  });
  
  var Player = Backbone.Model.extend({
    initialize: function() {
      this.set({
        play_status: 'stopped',
        playlist: window.displayedPlaylist
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
    switchPlaylist: function() {
      this.set({playlist: window.displayedPlaylist});
    },
    switchPlaylistAndTrack: function(newIndex) {
      this.switchPlaylist();
      this.switchTrack(newIndex);
    },
    switchTrack: function(newIndex) {
      var playlist = this.get('playlist');
      var oldStatus = this.get('play_status');
      this.set({play_status: 'stopped'});
      if (newIndex >= playlist.length || newIndex < 0) {
        newIndex = 0;
        oldStatus = 'stopped';
      }
      this.set({
        playlist_index: newIndex,
        track: this.get('playlist').at(newIndex).get('track')
      });
      this.set({play_status: oldStatus});
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
  
  var PlayerView = Backbone.View.extend({
    events: {
      'click #toggle_play_pause': 'togglePlayPause',
      'click #skip_forward': 'skipForward',
      'click #skip_backward': 'skipBackward'
    },
    initialize: function() {
      $('audio').bind('ended', this.skipForward);
      $('audio').bind('progress', this.updateProgress);
      $('audio').bind('timeupdate', this.updateTime);
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
        var audioSrc = track.get('stream_url') + '?client_id=' + player.get('clientId');
        $('audio').attr('src', audioSrc);
        $('audio').get(0).load();
      }
    },
    togglePlayPause: function() {
      window.player.togglePlayPause();
    },
    skipForward: function() {
      window.player.skipForward();
    },
    skipBackward: function() {
      window.player.skipBackward();
    },
    updateProgress: function() {},
    updateTime: function() {}
  });
    
  var PlaylistItemView = Backbone.View.extend({
    tagName:  'li',
    events: {
      'click span' : 'play'
    },
    initialize: function() {
      console.log('new PlaylistItemView', this.model.get('index'))
    },
    render: function() {
      $(this.el).html('<span>' + this.model.get('track').get('title') + '</span>')
      return this;
    },
    play: function() {
      window.player.switchPlaylistAndTrack(this.model.get('index'));
      window.player.set({play_status: 'playing'});
      console.log('play', this.model.get('index'));
    }
  });
  
  var PlaylistView = Backbone.View.extend({
    events: {
    },
    initialize: function() {
      window.displayedPlaylist.bind('add', this.addOne);
      window.displayedPlaylist.bind('reset', this.addAll);
      console.log('new PlaylistView')
    },
    addOne: function(newPlaylistItem) {
      console.log('adding playlistItem');
      var view = new PlaylistItemView({
        model: newPlaylistItem
      });
      $('ul#item_list').append(view.render().el);
      console.log('playlist.addOne')
    },
    addAll: function() {
      window.displayedPlaylist.each(this.addOne);
      console.log('playlist.addAll')
    },
  });
  
  var User = Backbone.Model.extend({
  });
  
  var Userlist = Backbone.Collection.extend({
    model: User
  });
  
  var UserPlaylistView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click span.playlist_name' : 'play'
    },
    render: function() {
      $(this.el).html('<span class="playlist_name">playlist</span>');
      return this;
    },
    play: function() {
      console.log('play!');
    }
  });
  
  var UserPlaylistsView = Backbone.View.extend({
    tagName:  'ul',
    render: function() {
      for (i = 0; i <= this.model.get('playlist_count'); i = i + 1) {
        $(this.el).append(new UserPlaylistView().render().el);
      }
      return this;
    }
  });
  
  var UserView = Backbone.View.extend({
    tagName:  'li',
    events: {
      'click span.username' : 'toggleExpanded'
    },
    initialize: function() {
      console.log('new UserView');
    },
    render: function() {
      var innerHTML = '<span class="username">' + this.model.get('username') + '</span>';
      $(this.el).html(innerHTML);
      if (this.expanded) {
        var expandedView = new UserPlaylistsView({
          model: this.model
        });
        $(this.el).append(expandedView.render().el)
      }
      return this;
    },
    toggleExpanded: function() {
      this.expanded = !this.expanded;
      this.render();
      console.log('toggleExpanded', this.expanded);
    }
  });
  
  
  var UserlistView = Backbone.View.extend({
    events: {
    },
    initialize: function() {
      window.userList.bind('add', this.addOne);
      window.userList.bind('reset', this.addAll);
      console.log('new UserlistView')
    },
    addOne: function(newUser) {
      var view = new UserView({
        model: newUser
      });
      view.expanded = false;
      $('ul#user_list').append(view.render().el);
      console.log('userlist.addOne', newUser.get('id'))
    },
    addAll: function() {
      window.displayedPlaylist.each(this.addOne);
      console.log('userlist.addAll')
    },
  });
  
  window.userList = new Userlist();
  window.userListView = new UserlistView({
    el: $('div#userlist_view')
  });
  window.userList.add([
    new User(exampleUsers[0]),
    new User(exampleUsers[1])
  ]);
  window.displayedPlaylist = new Playlist();
  window.playlistView = new PlaylistView({
    el: $('div#playlist_view')
  });
  window.displayedPlaylist.add([
    new PlaylistItem({
      track: new Track(exampleTracks[0]),
      index: 0
    }),
    new PlaylistItem({
      track: new Track(exampleTracks[1]),
      index: 1
    })
  ]);
  window.player = new Player({
    clientId: '821291bd3a5529686cc0067b4189b409'
  });
  window.playerView = new PlayerView({
    el: $('div#player_view')
  });
});
