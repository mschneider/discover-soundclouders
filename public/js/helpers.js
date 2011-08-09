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
});