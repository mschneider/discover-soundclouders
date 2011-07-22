$(function(){
  PlaylistView = Backbone.View.extend({
    
    initialize: function() {
      var that = this;
      this.model.bind('change:playlist', function() {that.render();});
    },
    
    render: function() {
      $(this.el).html('');
      var itemsView = new PlaylistItemsView({
        model: this.model.get('playlist').get('items')
      });
      $(this.el).append(itemsView.render().el);
      return this;
    }
  });
});