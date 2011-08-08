$(function(){
  UserDetailsView = Backbone.View.extend({
    initialize: function() {
      this.template = Handlebars.compile($("#user-details-template").html());
      var that = this;
      this.model.bind('change:recommendedUser', function(model, user) { 
        user.bind('change', function() { that.render(); });
        that.render();
      });
    },
    
    render: function() {
      var user = this.model.get('recommendedUser');
      if (user) {
        $(this.el).html(this.template(user.toJSON()));
      } else
        $(this.el).html('No User selected.');
      return this;
    }
  }); 
});