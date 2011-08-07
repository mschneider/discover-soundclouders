$(function(){
  UserRecommendersView = Backbone.View.extend({
    initialize: function() {
      var that = this;
      this.model.bind('change:recommenders', function() {that.render();})
    },
    
    render: function() {
      
      return this;
    }
  }); 
});