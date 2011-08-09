$(function(){
  UserDetailsView = Backbone.View.extend({
    initialize: function() {
      this.template = Handlebars.compile($("#user-details-template").html());
      var that = this;
      this.model.bind('change:displayedUser', function(model, user) { 
        user.bind('change', function() { that.render(); });
        that.render();
      });
    },
    
    render: function() {
      var user = this.model.get('displayedUser');
      if (user)
        $(this.el).html(this.template(user.toJSON()));
      return this;
    }
  }); 
});