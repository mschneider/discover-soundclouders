$(function(){
  UserTracklistItemsView = Backbone.View.extend({
    initialize: function() {
      this.template = Handlebars.compile($("#user-tracklist-items-template").html());
      var that = this;
      this.model.bind('change:displayedTracks', function(model, tracklist) {
        tracklist.bind('reset', function() { that.render(); });
        that.render();
      });
    },
    
    render: function() {
      var tracks = this.model.get('displayedTracks');
      if (tracks) {
        $(this.el).html(this.template({items: tracks.toJSON()}));
      } else
        $(this.el).html('No Tracks displayed.');
      return this;
    }
  }); 
});