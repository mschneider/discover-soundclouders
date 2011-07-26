$(function(){
  PlaylistSelectionView = Backbone.View.extend({
    className: 'PlaylistSelection',
    tagName: 'div',
    
    initialize: function() {
      this.controller = this.model;
      this.searchesView = new SearchesView({
        model: this.controller.get('searches')
      });
      var that = this;
      var render = function() {that.render();};
      this.controller.get('users').bind('add', render);
      this.controller.get('users').bind('reset', render);
    },
    
    render: function() {
      var el = $(this.el);
      el.html('');
      el.append(this.searchesView.render().el);
      this.controller.get('users').forEach(function(user) {
        var userView = new UserPlaylistsView({model: user});
        el.append(userView.render().el);
      });
      return this;
    }
  });
});