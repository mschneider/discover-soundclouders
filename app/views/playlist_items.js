$(function(){
  PlaylistItemsView = Backbone.View.extend({
    tagName: 'ul',
    
    render: function() {
      var that = this;
      $(this.el).html('');
      for (var i = 0; i < this.model.length; i = i + 1) {
        var itemView = new PlaylistItemView({
          index: i,
          model: that.model.at(i)
        });
        $(that.el).append(itemView.render().el)
      }
      return this;
    }
  });
});