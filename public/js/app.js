$(function(){
  App = new ApplicationController({ APIKey: '6c574a63595f5f55c82cd58f945f932a' });
  Player = new PlayerController();
  
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
    var inner = _(text.split('\n')).chain()
      .without('\r')
      .compact()
      .join('</p><p>')
      .value()
    return '<p>' + inner + '</p>';
  });
  
  Handlebars.registerHelper('nameCountryCity', function(user) {
    var parts = [user.full_name, user.country, user.city]
    return _(parts).chain()
      .compact()
      .join(', ')
      .value();
  });
  
  new HeaderView({
    el: $('#header'),
    model: App
  });
  new PlayerView({
    el: $('#player'),
    model: Player
  });
  new RecommendedUserView({
    el: $('#recommended-user'),
    model: App
  });
  console.log('views built.');
})