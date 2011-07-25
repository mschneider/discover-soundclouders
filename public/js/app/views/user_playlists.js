$(function(){
  UserPlaylistsView = Backbone.View.extend({
    tagName: 'ul',
    
    initialize: function() {
      var that = this;
      var render = function() {that.render();};
      this.model.get('playlists').bind('add', render);
      this.model.get('playlists').bind('reset', render);
    },
    
    render: function() {
      var el = $(this.el);
      el.html(this.model.get('permalink'));
      this.model.get('playlists').forEach(function(playlist) {
        var playlistView = new PlaylistNameView({model: playlist});
        el.append(playlistView.render().el);
      });
      return this;
    }
  });
});