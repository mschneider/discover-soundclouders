$(function(){
  PlaylistSelectionView = Backbone.View.extend({
    
    initialize: function() {
      this.searchesView = new SearchesView({
        model: this.model.get('searches')
      });
    },
    
    render: function() {
      $(this.el).html('');
      $(this.el).append(this.searchesView.render().el);
      return this;
    }
  });
});