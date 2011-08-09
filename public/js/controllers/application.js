$(function(){
  ApplicationController = Backbone.Model.extend({
    currentIndex: function() {
      return this.get('recommendedUsers').indexOf(this.get('displayedUser'));
    },
    
    
    displayNext: function() {
      var index = this.currentIndex() + 1,
          length = this.get('recommendedUsers').length;
      if (index >= length)
        index -= length;
      this.display(index);
    },
    
    displayPrevious: function() {      
      var index = this.currentIndex() - 1,
          length = this.get('recommendedUsers').length;
      if (index < 0)
        index += length;
      this.display(index);
    },
    
    display: function(index) {
      this.set({displayedUser: this.get('recommendedUsers').at(index)});
      this.selectTracklist(this.get('tracklistName') || 'Tracks');
    },
    
    selectTracklist: function(name) {
      var tracklist = TrackList.build(this.get('displayedUser'), name);
      this.set({
        tracklistName: name,
        displayedTracks: tracklist
      });
    }
  });
});