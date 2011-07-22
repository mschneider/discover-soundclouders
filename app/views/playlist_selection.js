$(function(){
  PlaylistSelectionView = Backbone.View.extend({
    
    initialize: function() {
      this.searchesView = new SearchesView({
        model: this.model.get('searches')
      });
      var that = this;
      var render = function() {that.render();};
      this.model.get('users').bind('add', render);
      this.model.get('users').bind('reset', render);
    },
    
    render: function() {
      var el = $(this.el);
      el.html('');
      el.append(this.searchesView.render().el);
      this.model.get('users').forEach(function(user) {
        var userView = new UserPlaylistsView({model: user});
        el.append(userView.render().el);
      });
      return this;
    }
  });
});