$(function(){
  UserTracklistItemsView = Backbone.View.extend({
    events: {
      'dblclick .streamable' : 'click'
    },
    tagName: 'ol',
    
    initialize: function() {
      this.template = Handlebars.compile($("#user-tracklist-items-template").html());
      var that = this;
      this.model.bind('change:displayedTracks', function(model, tracklist) {
        tracklist.bind('reset', function(updatedTracklist) {
          that.render();
        });
        that.render();
      });
    },
    
    click: function(event) {
      var listitems = $(this.el).children(),
          index = listitems.index(listitems.has(event.srcElement));
      Player.play(Recommendations.get('displayedTracks'), index);
    },
    
    render: function() {
      var tracks = this.model.get('displayedTracks');
      if (tracks)
        $(this.el).html(this.template({items: tracks.toJSON()}));
      return this;
    }
  }); 
});