$(function(){
  PlaylistView = Backbone.View.extend({
    
    initialize: function() {
      var that = this; //srsjs..
      this.model.bind('change:playlist', function() {
        that.rebuildItemsView();
      });
      this.rebuildItemsView();
    },
    
    rebuildItemsView: function() {
      this.itemsView = new PlaylistItemsView({
        model: this.model.get('playlist').get('items')
      });
      this.render();
    },
    
    render: function() {
      $(this.el).html('');
      $(this.el).append(this.itemsView.render().el);
      return this;
    }
  });
});