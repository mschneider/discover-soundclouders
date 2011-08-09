$(function(){
  HeaderView = Backbone.View.extend({
    events: {      
      'click span#backward' : 'backward',
      'click span#forward' : 'forward'
    },
    
    initialize: function() {
      this.template = Handlebars.compile($("#header-template").html());
      this.render();
    },
    
    backward: function() {
      this.model.displayPrevious();
    },
    
    forward: function() {
      this.model.displayNext();
    },
    
    render: function() {
      $(this.el).html(this.template());
      return this;
    }
  }); 
});