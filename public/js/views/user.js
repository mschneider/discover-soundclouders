$(function(){
  UserView = Backbone.View.extend({
    initialize: function() {
      console.log('UserView::initialize', this.model);
      var that = this;
      this.model.bind('change:selectedUser', function() {that.render()});
      this.template = Handlebars.compile($("#user-template").html());
    },
    
    render: function() {
      var selectedUser = this.model.get('selectedUser');
      console.log('UserView::render', selectedUser);
      if (selectedUser)
        $(this.el).html(this.template(selectedUser));
      else
        $(this.el).html('No User selected.');
    }
  }); 
});