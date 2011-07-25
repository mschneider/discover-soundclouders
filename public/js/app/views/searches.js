$(function(){
  SearchesView = Backbone.View.extend({
    tagName: 'ul',
    
    initialize: function() {
      var that = this;
      var render = function() {that.render();};
      this.model.bind('add', render);
      this.model.bind('reset', render);
    },
    
    render: function() {
      var el = $(this.el);
      el.html('Searches');
      this.model.forEach(function(playlist) {
        var playlistView = new PlaylistNameView({model: playlist});
        el.append(playlistView.render().el);
      });
      return this;
    }
  });
});