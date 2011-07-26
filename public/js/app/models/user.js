$(function(){
  User = Backbone.Model.extend({
    
    initialize: function() {
      if (!this.get('playlists')) {
        this.set({playlists: new PlaylistList()});
      }
    },
    
    fetchData: function(urlSuffix, cb1, cb2){
      $.ajax({
        url: 'http://api.soundcloud.com/users/' + this.get('id') + urlSuffix,
        data: {client_id: App.client_id},
        dataType: 'jsonp',
        success: cb1,
        error: cb2
      });
    },
    
    gatherPlaylists: function(cb) {
      var that = this, tracks, favorites, finish = function() {
        if (tracks && favorites) {
          that.get('playlists').addPlaylistWithName(tracks, 'Tracks', false);
          that.get('playlists').addPlaylistWithName(favorites, 'Favorites', false);
          that.get('playlists').addPlaylistWithName([], 'Custom', true);
          cb(that);
        } 
      };
      this.fetchData(
        '/tracks.json',
        function(result) {
          tracks = result;
          finish();
        },
        function() {
          console.error('fetching tracks of user', that.get('permalink'), 'failed')
        }
      );
      this.fetchData(
        '/favorites.json',
        function(result) {
          favorites = result;
          finish();
        },
        function() {
          console.error('fetching favorites of user', that.get('permalink'), 'failed')
        }
      );
    }
  });
  
  User.fromPermalink = function(permalink, cb) {
    var requestData = {
      client_id: App.client_id,
      url: 'http://soundcloud.com/' + permalink
    };
    $.ajax({
      url: 'https://api.soundcloud.com/resolve.json',
      data: requestData,
      dataType: 'jsonp',
      success: function(user) {
        new User(user).gatherPlaylists(cb);
      },
      error: function() {
        console.error('locating user', username, 'failed')
      }
    });
  };
  
  UserList = Backbone.Collection.extend({
    model: User
  })
});