$(function(){
  PlaylistItemView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'dblclick' : 'play'
    },
    
    initialize: function() {
      console.log('new PlaylistItemView for', this.model);
    },
    
    render: function() {
      $(this.el).html('<span>' + this.model.get('title') + '</span>')
      return this;
    },
    
    play: function() {
      App.displayedPlaylist.play(this.model.get('index'));
    }
  });
});