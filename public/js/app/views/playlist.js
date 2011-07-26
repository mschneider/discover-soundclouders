$(function(){
  PlaylistView = Backbone.View.extend({
    className: 'Playlist',
    tagName: 'div',
    
    initialize: function() {
      var that = this;
      this.controller = this.model;
      this.controller.bind('change:playlist', function() {that.render();});
    },
    
    render: function() {
      $(this.el).html('Selected Playlist:');
      var itemsView = new PlaylistItemsView({
        model: this.model.get('playlist').get('items')
      });
      itemsView.controller = this.controller;
      $(this.el).append(itemsView.render().el);
      return this;
    }
  });
});