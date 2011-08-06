$(function(){
  PositionGenerator = function() {
    this.position = new Vector();
    this.direction = 'up';
  };
  
  PositionGenerator.prototype.next = function() {
    switch(this.direction) {
      case 'up':
        this.stepUp();
        break;
      case 'down':
        this.stepDown();
        break;
    }
    return _(this.position).clone();
  };
  
  PositionGenerator.prototype.stepDown = function() {
    if (this.position.x == 0) {
      this.direction = 'up'
    } else {
      this.position.x -= 1;
    }
    this.position.y += 1;
  };
  
  PositionGenerator.prototype.stepUp = function() {
    if (this.position.y == 0) {
      this.direction = 'down'
    } else {
      this.position.y -= 1;
    }  
    this.position.x += 1;
  };
})