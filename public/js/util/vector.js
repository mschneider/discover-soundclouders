$(function(){
  Vector = function(argument) {
    _.extend(this, argument)
    _.defaults(this, {x: 0, y:0});
  };

  Vector.prototype.plus = function(other) {
    return new Vector({x: this.x + other.x, y: this.y + other.y});
  };

  Vector.prototype.distanceTo = function(other) {
    return new Vector({x: other.x - this.x, y: other.y - this.y});
  };

  Vector.prototype.magnitude = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  };
  
  Vector.prototype.minus = function(other) {
    return new Vector({x: this.x - other.x, y: this.y - other.y});
  };

  Vector.prototype.normalized = function() {
    return this.scaledBy( 1 / this.magnitude());
  };

  Vector.prototype.scaledBy = function(factor) {
    return new Vector({x: this.x * factor, y: this.y * factor});
  };
  
})