$(function(){
  User = Backbone.Model.extend({
    
    initialize: function() {
      if (!this.get('playlists')) {
        this.set({playlists: new PlaylistList()});
      }
    }
  });
  
  UserList = Backbone.Collection.extend({
    model: User
  })
});