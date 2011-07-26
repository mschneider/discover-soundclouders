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
      $(this.el).html('');
      var itemsView = new PlaylistItemsView({
        model: this.controller.get('playlist').get('items')
      });
      $(this.el).append(itemsView.render().el);
      return this;
    }
  });
});