$(function(){
  PlaylistTracksView = Backbone.View.extend({
    
    initialize: function() {
      var that = this;
      this.controller = this.model;
      this.controller.bind('change:playlist', function() {that.render();});
    },
    
    render: function() {
      $(this.el).html('Playlist');
      var itemsView = new PlaylistItemsView({
        model: this.model.get('playlist').get('items')
      });
      itemsView.controller = this.controller;
      $(this.el).append(itemsView.render().el);
      return this;
    }
  });
});