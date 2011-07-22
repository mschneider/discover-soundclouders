$(function(){
  PlaylistItemView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'dblclick' : 'play'
    },
    
    render: function() {
      $(this.el).html(this.model.get('title'))
      return this;
    },
    
    play: function() {
      App.displayedPlaylist.play(this.model.get('index'));
    }
  });
});