$(function(){
  SearchView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click' : 'display'
    },
    
    display: function() {
      App.displayedPlaylist.set({playlist: this.model});
    },
    
    render: function() {
      $(this.el).html(this.model.get('search_term'));
      return this;
    }
  });
});