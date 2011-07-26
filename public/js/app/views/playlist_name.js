$(function(){
  PlaylistNameView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'mouseup' : 'mouseUp'
    },
    
    mouseUp: function() {
      App.library.mouseUpOnPlaylistName(this.model);
    },
    
    render: function() {
      $(this.el).html(this.model.get('name'));
      return this;
    }
  });
});