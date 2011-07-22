$(function(){
  
  PlaylistSelectionController = Backbone.Model.extend({
    
    initialize: function() {
      this.set({
        searches: new PlaylistList(),
        users: new UserList()
      });
    },
    
    addSearch: function(query) {
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
          console.log('success', query, tracks);
          var searchResult = new Playlist({
              items: new PlaylistItemList(tracks),
              name: '"' + query + '"'
          });
          that.get('searches').add(searchResult);
          App.displayedPlaylist.set({playlist: searchResult});
        },
        error: function() {
          console.error('OUCH! searching', query, 'failed');
        }
      });
    }
  });
});