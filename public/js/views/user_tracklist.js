$(function(){
  UserTracklistView = Backbone.View.extend({
    initialize: function() {
      this.tabs = new UserTracklistTabsView({
        id: 'user-tracklist-tabs',
        model: this.model
      });
      this.items = new UserTracklistItemsView({
        id: 'user-tracklist-items',
        model: this.model
      });
      $(this.el).append(this.tabs.render().el);
      $(this.el).append(this.items.render().el);
    },
    
    render: function() {
      this.tabs.render();
      this.items.render();
      return this;
    }
  }); 
});