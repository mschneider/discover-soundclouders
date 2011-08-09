$(function(){
  UserDetailsView = Backbone.View.extend({
    initialize: function() {
      this.controller = this.model;
      this.template = Handlebars.compile($("#user-details-template").html());
      var that = this;
      this.controller.bind('change:displayedUser', function(c, user) { 
        user.bind('change', function(user) { that.render(user); });
        that.render(user);
      });
    },
    
    render: function(user) {
      $(this.el).html(this.template(user.toJSON()));
      return this;
    }
  }); 
});