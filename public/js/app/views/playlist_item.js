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
      $(this.el).html(this.model.escape('title'));
      return this;
    },
    
    mouseDown: function(event) {
      this.controller.mouseDownOn(this.model);
    },
    
    mouseUp: function(event) {
      this.controller.mouseUpOn(this.model, event.ctrlKey || event.metaKey);
    },
    
    updateSelection: function() {
      if (this.model.get('selected'))
        $(this.el).attr('class', 'selected ' + this.className);
      else
        $(this.el).attr('class', this.className);
    }
  });
});