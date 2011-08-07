$(function(){
  Track = Backbone.Model.extend({

  });
  
  TrackList = Backbone.Collection.extend({
    model: Track,
    
    url: function() {
      return this.user.baseUrl() + '/' + this.type + App.urlPostfix();
    }
  });
  
  TrackList.build = function(user, type) {
    if (!user)
      return new TrackList([]);
    var list = new TrackList();
    list.user = user;
    list.type = type.toLowerCase();
    list.fetch();
    return list;
  }
});