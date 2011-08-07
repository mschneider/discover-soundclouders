$(function(){
  UserTracklistTabView = Backbone.View.extend({
    tagName: 'span',
    events: {
      'click' : 'click'
    },
    
    click: function() {
      this.model.selectTab(this.text);
    },
    
    render: function() {
      var selected = this.model.get('selectedTab');
      $(this.el).text(this.text);
      if (selected == this.text)
        $(this.el).attr('class', 'selected');
      else
        $(this.el).attr('class', '');
      return this;
    }
  }); 
  
  UserTracklistTabView.build = function(model, text) {
    var tab = new UserTracklistTabView({
      class: 'user-tracklist-tab',
      model: model
    });
    tab.text = text;
    return tab;
  }
});