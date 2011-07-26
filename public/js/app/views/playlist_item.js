$(function(){
  PlaylistItemView = Backbone.View.extend({
    className: 'PlaylistItem',
    tagName: 'li',
    events: {
      'mousedown' : 'mouseDown',
      'mouseup' : 'mouseUp' // mouseUp inhibts click event 
    },                      // all necessary logic is located in the controller
    
    initialize: function() {
      var that = this;
      this.model.bind('change:selected', function() {that.updateSelection();});
      this.updateSelection();
    },
    
    render: function() {
      $(this.el).html(ich.playlist_item(this.model.attributes, true));
      return this;
    },
    
    mouseDown: function(event) {
      App.library.mouseDownOnPlaylistItem(this.model);
      return false;
    },
    
    mouseUp: function(event) {
      App.library.mouseUpOnPlaylistItem(this.model, event.ctrlKey || event.metaKey);
      return false;
    },
    
    updateSelection: function() {
      if (this.model.get('selected'))
        $(this.el).attr('class', 'selected ' + this.className);
      else
        $(this.el).attr('class', this.className);
    }
  });
});