$(function(){
  UserDetailsView = Backbone.View.extend({
    initialize: function() {
      this.template = Handlebars.compile($("#user-details-template").html());
    },
    
    render: function() {
      var user = this.model.get('recommendedUser');
      if (user) {
        this.template = Handlebars.compile($("#user-details-template").html());
        $(this.el).html(this.template(user.toJSON()));
      } else
        $(this.el).html('No User selected.');
      return this;
    }
  }); 
});