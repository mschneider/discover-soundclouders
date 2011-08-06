$(function(){
  App = new (Backbone.Model.extend({
    APIKey: '6c574a63595f5f55c82cd58f945f932a'
  }))();
  
  $.get('/me.json', function(me) {
    $.get('/recommendations.json', function(data) {
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
      // renderer
      var center = function(node, xOffset, yOffset, factor) {
        return node.position.minus(new Vector({x: xOffset, y:yOffset})).scaledBy(factor);
      }
      var centerOffset = new Vector({x: 50, y: 50})
      var extend = centerOffset.scaledBy(2);
      var topLeft = function(node, xOffset, yOffset, factor) {
        return node.position.minus(new Vector({x: xOffset, y:yOffset})).scaledBy(factor).minus(centerOffset);
      }
      var render = function(nodes) {
        var minX = _(nodes).chain().values().map(function(i){return i.position.x}).min().value(),
            maxX = _(nodes).chain().values().map(function(i){return i.position.x}).max().value(),
            minY = _(nodes).chain().values().map(function(i){return i.position.y}).min().value(),
            maxY = _(nodes).chain().values().map(function(i){return i.position.y}).max().value(),
            diffX = (maxX - minX),
            diffY = (maxY - minY),
            scaling = 1 / Math.max(diffX / 3000, diffY / 3000);
        console.log('x:', minX, maxX, 'y:', minY, maxY);
        $('#recommendations_view')[0].width = 3000;
        $('#recommendations_view')[0].height = 3000;
        var ctx = $('#recommendations_view')[0].getContext('2d');
        _(_(nodes).values()).each(function(node) {
          _(node.recommended).each(function(recommendation) {
            if (recommendation.by.id == me.id) return; 
            var start = center(node, minX, minY, scaling),
                end = center(recommendation.by, minX, minY, scaling);
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
          });
          ctx.strokeStyle = "#eee";
          ctx.stroke();
        });
        _(_(nodes).values()).each(function(node) {
          var topLeftPoint = topLeft(node, minX, minY, scaling);
          ctx.fillRect(topLeftPoint.x, topLeftPoint.y, extend.x, extend.y);
        });        
      };
      // simulation
      var damping = 0.75, timestep = 0.01;
      var rounds = 1000;
      var simulateForces = function() {
        var total_kinetic_energy = 0;
        _(nodes).each(function(currentNode, currentId) {
          var force = _(nodes).chain()
            .values()
            .filter(function(otherNode) { return currentNode != otherNode; })
            .map(function(otherNode) { return currentNode.forceBetween(otherNode); })
            .reduce(function(intermediate, next) { return intermediate.plus(next)}, new Vector())
            .value();
          currentNode.velocity = force.scaledBy(timestep).plus(currentNode.velocity).scaledBy(damping);
          if (currentNode.id != me.id) {
            currentNode.position = currentNode.position.plus(currentNode.velocity);
          }
          total_kinetic_energy += currentNode.velocity.magnitude();
        });
        console.log('total_kinetic_energy:', total_kinetic_energy);
        return total_kinetic_energy;
      }
      while(simulateForces() > 15);
      render(nodes);
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