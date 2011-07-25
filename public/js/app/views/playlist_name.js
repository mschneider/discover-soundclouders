$(function(){
  PlaylistNameView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click' : 'display'
    },
    
    display: function() {
      App.displayedPlaylist.display(this.model);
    },
    
    render: function() {
      $(this.el).html(this.model.get('name'));
      return this;
    }
  });
});