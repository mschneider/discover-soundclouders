$(function(){
  RecommendationsView = Backbone.View.extend({
    tagName: 'canvas',
    events: {
      'mousedown': 'mouseDown',
      'mouseup': 'mouseUp'
    },
    
    initialize: function() {
      var that = this;
      this.model.bind('change:recommendations', function() {that.render();});
    },
    
    mouseDown: function() {
      console.log('RecommendationsView::mouseDown');
    },
    
    mouseUp: function() {
      console.log('RecommendationsView::mouseUp');
    },
    
    render: function() {
      var recommendations = this.model.get('recommendations')
      console.log('RecommendationsView::render', recommendations);
    }
  }); 
});