$(function(){
  UserTracklistTabView = Backbone.View.extend({
    tagName: 'span',
    events: {
      'click' : 'click'
    },
    
    click: function() {
      this.model.selectTracklist(this.text);
    },
    
    render: function() {
      var selected = this.model.get('tracklistName');
      $(this.el).text(this.text);
      if (selected == this.text)
        $(this.el).attr('class', 'selected');
      else
        $(this.el).attr('class', '');
      return this;
    }
  }); 
  
  UserTracklistTabView.build = function(controller, text) {
    var tab = new UserTracklistTabView({
      class: 'user-tracklist-tab',
      model: controller
    });
    tab.text = text;
    return tab;
  }
});