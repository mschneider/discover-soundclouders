$(function(){
  App = new (Backbone.Model.extend({
    APIKey: '6c574a63595f5f55c82cd58f945f932a'
  }))();
  
  $.get('/me', function(me) {
    me = JSON.parse(me);
    console.log('received!', me);
    $.get('/me/recommendations', function(data) {
      data = JSON.parse(data);
      console.log('received!', data);
      // generate nodeids - including mine
      var nodeIds = _(data).chain()
        .map(function(item) { return [item.who, item.by_whom]; })
        .flatten()
        .uniq()
        .value();        
      nodeIds.push(me.id);
      // generate node objects
      var positionGenerator = new PositionGenerator();
      var nodes = {};
      _(nodeIds).each(function(nodeId) {
        nodes[nodeId] = new Node({
          id: nodeId,
          recommended: [],
          velocity: new Vector(),
          position: positionGenerator.next()
        });
      });
      // rebuild relationship between me and my followings
      // 2 > anything in (0,1] therefore my node will be centered
      _(data).chain()
        .map(function(item) { return item.by_whom; })
        .uniq()
        .each(function(nodeId) {
          nodes[nodeId].recommended.push({
            by: nodes[me.id],
            weight: 2
          });
        });
      // insert real recommendations
      _(data).each(function(item) {
        nodes[item.who].recommended.push({
          by: nodes[item.by_whom],
          weight: item.weight
        });
      });
      console.log('built nodes:', nodes);
      // simulation
      var damping = 0.5, timestep = 1;
      var rounds = 10;
      while (rounds > 0) {
        var total_kinetic_energy = 0;
        _(nodes).each(function(currentNode, currentId) {
          var force = _(nodes).chain()
            .values()
            .filter(function(otherNode) { return currentNode != otherNode; })
            .map(function(otherNode) { return currentNode.forceBetween(otherNode); })
            .reduce(function(intermediate, next) { return intermediate.plus(next)}, new Vector())
            .value();
          currentNode.velocity = force.scaledBy(timestep).plus(currentNode.velocity).scaledBy(damping);
          currentNode.position = currentNode.position.plus(currentNode.velocity);
          total_kinetic_energy += currentNode.velocity.magnitude();
        });
        console.log('total_kinetic_energy:', total_kinetic_energy);
        rounds -= 1;
        // if (total_kinetic_energy < 4000) break;
      }
      console.log(
        'x:',
        _(nodes).chain().values().map(function(i){return i.position.x}).min().value(),
        _(nodes).chain().values().map(function(i){return i.position.x}).max().value(),
        'y:',
        _(nodes).chain().values().map(function(i){return i.position.y}).min().value(),
        _(nodes).chain().values().map(function(i){return i.position.y}).max().value()
        );
    });
  });
  
  new RecommendationsView({
    model: App,
    el: $('#recommendations_view')
  }).render();
  new UserView({
    model: App,
    el: $('#user_view')
  }).render();
})