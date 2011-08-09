$(function(){
  UserTracklistItemsView = Backbone.View.extend({
    events: {
      'dblclick .streamable' : 'click'
    },
    tagName: 'ol',
    
    initialize: function() {
      this.controller = this.model;
      this.template = Handlebars.compile($("#user-tracklist-items-template").html());
      var that = this;
      this.controller.bind('change:displayedTracks', function(c, tracklist) {
        tracklist.bind('reset', function(tracklist) {
          that.render(tracklist);
        });
        that.render(tracklist);
      });
    },
    
    click: function(event) {
      var listitems = $(this.el).children(),
          index = listitems.index(listitems.has(event.srcElement));
      Player.play(Recommendations.get('displayedTracks'), index);
    },
    
    render: function(tracklist) {
      $(this.el).html(this.template({items: tracklist.toJSON()}));
      return this;
    }
  }); 
});