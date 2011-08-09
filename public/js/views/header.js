$(function(){
  HeaderView = Backbone.View.extend({
    events: {      
      'click span#backward' : 'backward',
      'click span#forward' : 'forward'
    },
    
    initialize: function() {
      this.controller = this.model;
      this.template = Handlebars.compile($("#header-template").html());
      $(this.el).html(this.template());
    },
    
    backward: function() {
      this.controller.displayPrevious();
    },
    
    forward: function() {
      this.controller.displayNext();
    }
  }); 
});