$(function(){
  PlaylistNameView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'mouseup' : 'mouseUp'
    },
    
    mouseUp: function() {
      if (!this.model.get('editable')) 
        return true; // pass off to library event handler
      App.library.mouseUpOnPlaylistName(this.model);
      return false;
    },
    
    render: function() {
      $(this.el).html(this.model.get('name'));
      return this;
    }
  });
});