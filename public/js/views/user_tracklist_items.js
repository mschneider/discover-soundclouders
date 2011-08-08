$(function(){
  UserTracklistItemsView = Backbone.View.extend({
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
    
    render: function() {
      var tracks = this.model.get('displayedTracks');
      if (tracks)
        $(this.el).html(this.template({items: tracks.toJSON()}));
      return this;
    }
  }); 
});