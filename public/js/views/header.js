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
      this.model.previousRecommendation();
    },
    
    forward: function() {
      this.model.nextRecommendation();
    },
    
    render: function() {
      $(this.el).html(this.template());
      return this;
    }
  }); 
});