$(function(){
  Track = Backbone.Model.extend({
    
    toJSON: function() {
      var result = Backbone.Model.prototype.toJSON.call(this);
      var durationInSeconds = Math.floor(result.duration / 1000);
      result.seconds = durationInSeconds % 60;
      var durationInMinutes = Math.floor(durationInSeconds / 60);
      result.minutes = durationInMinutes % 60;
      result.hours = Math.floor(durationInMinutes / 60);
      if (result.seconds < 10)
        result.seconds = '0' + result.seconds;
      if (result.hours > 0 && result.minutes < 10)
        result.minutes = '0' + result.minutes;
      if (result.hours == 0)
        result.hours = undefined;
      if (result.streamable)
        result.stream_url = result.stream_url + App.urlPostfix();
      return result;
    }
  });
  
  TrackList = Backbone.Collection.extend({
    model: Track,
    
    url: function() {
      return this.user.baseUrl() + '/' + this.type + '.json'+ App.urlPostfix();
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