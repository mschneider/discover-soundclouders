$(function(){
  App = new (Backbone.Model.extend({
    APIKey: '6c574a63595f5f55c82cd58f945f932a',
    
    currentRecommendationIndex: function() {
      return this.get('recommendedUsers').indexOf(this.get('recommendedUser'));
    },
    
    nextRecommendation: function() {
      var index = this.currentRecommendationIndex() + 1,
          length = this.get('recommendedUsers').length;
      if (index >= length)
        index -= length;
      this.selectRecommendation(index);
    },
    
    previousRecommendation: function() {      
      var index = this.currentRecommendationIndex() - 1,
          length = this.get('recommendedUsers').length;
      if (index < 0)
        index += length;
      this.selectRecommendation(index);
    },
    
    selectRecommendation: function(index) {
      this.set({recommendedUser: this.get('recommendedUsers').at(index)});
      this.selectTab(this.get('selectedTab') || 'Tracks');
    },
    
    selectTab: function(name) {
      var tracklist = TrackList.build(this.get('recommendedUser'), name);
      this.set({
        selectedTab: name,
        displayedTracks: tracklist
      });
    },
    
    start: function(recommendedUsers) {
      this.set({recommendedUsers: recommendedUsers});
      this.selectRecommendation(0);
    },
    
    urlPostfix: function() {
      return '.json?client_id=' + this.APIKey;
    }
  }))();
  
  $.get('/recommendations.json', function(recommendations) {
    console.log('received:', recommendations);
    App.start(new UserList(recommendations));
    console.log('initialization finshed.');
  });
  
  _.mixin({
    join: function(array, seperator) {
      if (_.isEmpty(array)) 
        return '';
      else
        return _(array).chain()
          .rest()
          .reduce(function(result, item) {
            return result + seperator + item.toString();
          }, _.first(array).toString())
          .value();
    }
  })
  
  Handlebars.registerHelper('multilineText', function(text) {
    if (!text) return '';
    return _(text.split('\n')).reduce(function(open_p, line) {
      return open_p + line + '</p><p>'
    }, '<p>');
  });
  
  Handlebars.registerHelper('nameCountryCity', function(user) {
    var parts = [user.full_name, user.country, user.city]
    return _(parts).chain()
      .compact()
      .join(', ')
      .value();
  });
  
  new HeaderView({
    el: $('div#header'),
    model: App
  });
  new RecommendedUserView({
    el: $('div#recommended-user'),
    model: App
  });
  console.log('views built.');
})