$(function(){
  PlaylistItemsView = Backbone.View.extend({
    tagName: 'ul',
    
    initialize: function() {
      this.itemViews = [];
      for (var i = 0; i < this.model.length; i = i + 1) {
        this.itemViews.push(new PlaylistItemView({
          index: i,
          model: this.model.at(i)
        }))
      }
    },
    
    render: function() {
      var el = $(this.el);
      el.html('');
      this.itemViews.forEach(function(view) {
        el.append(view.render().el);
      }); 
      return this;
    }
  });
});