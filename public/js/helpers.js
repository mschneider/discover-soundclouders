$(function(){
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
  });
  
  var meaningfullName = function(user) {
    return _([user.full_name, user.username, user.permalink]).chain()
      .compact()
      .first()
      .value();
  };
  
  Handlebars.registerHelper('meaningfullName', meaningfullName);

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
    var parts = [meaningfullName(user), user.country, user.city]
    return _(parts).chain()
      .compact()
      .join(', ')
      .value();
  });
  
  APIKey = '6c574a63595f5f55c82cd58f945f932a';
  URLPostfix = '?client_id=' + APIKey;
});