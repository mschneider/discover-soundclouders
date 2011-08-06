$(function(){
  Node = Backbone.Model.extend({
    
    initialize: function() {
      _.extend(this, this.attributes) // TODO remove hack
    },
    
    attractionTo: function(other) {
      var weight = _(_.union(this.recommended, other.recommended)).chain()
        .filter(function(recommended) {
          return recommended.by == this || recommended.by == other; })
        .reduce(function(intermediate, item) { return intermediate + item.weight;}, 0)
        .value();
      var directedDistance = this.position.distanceTo(other.position);
      var equilibriumDistance = directedDistance.normalized().scaledBy(100);
      return directedDistance.minus(equilibriumDistance).scaledBy(2 * weight);
    },
    
    forceBetween: function(other) {
      return this.attractionTo(other).plus(this.repulsionFrom(other));
    },
    
    repulsionFrom: function(other) {
      var directedDistance = this.position.distanceTo(other.position);
      var distance = directedDistance.magnitude();
      var factor = -1 * 10000 / (distance * distance);
      return directedDistance.normalized().scaledBy(factor);
    }
    
  })
});