$(function(){
  User = Backbone.Model.extend({
    initialize: function() {
      this.fetch()
      if (this.get('recommenders'))
        this.set({ recommenders: new UserList(this.get('recommenders')) });
    },
    
    baseUrl: function() {
      return 'http://api.soundcloud.com/users/' + this.get('id')
    },
    
    url: function() {
      return this.baseUrl() + App.urlPostfix();
    }
  });
  
  UserList = Backbone.Collection.extend({
    model: User
  });

});