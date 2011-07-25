$(function(){
  PlaylistItemsView = Backbone.View.extend({
    className: 'Playlist',
    tagName: 'ol',

    initialize: function(){
      var that = this;
      this.model.bind('reset', function() {that.render();});
    },
    
    render: function() {
      $(this.el).html('');
      for (var i = 0; i < this.model.length; i = i + 1) {
        var itemView = new PlaylistItemView({
          index: i,
          model: this.model.at(i)
        });
        itemView.controller = this.controller;
        $(this.el).append(itemView.render().el)
      }
      return this;
    }
  });
});