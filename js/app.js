var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 686;
var COL_WIDTH = 101;
var ROW_HEIGHT = 83;
var ROWS = 6 ;
var COLS = 5 ;
var ENEMY_TRACK_POSITIONS = [65,150,230];
var ENEMY_SPEEDS = [100,125,150,175,200];
var ENEMY_START_POSITION_X = -15;
var PLAYER_START_POSITION_Y = ((ROWS - 1) * ROW_HEIGHT) - 25 ;
var PLAYER_START_POSITION_X = 2 * COL_WIDTH;

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Enemies our player must avoid
var Enemy = function() {
    this.x = ENEMY_START_POSITION_X;
    this.y = ENEMY_TRACK_POSITIONS[getRandomInt(ENEMY_TRACK_POSITIONS.length)];
    this.speed = ENEMY_SPEEDS[getRandomInt(ENEMY_SPEEDS.length)];
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.reset = function() {
  this.x = ENEMY_START_POSITION_X;
  this.y = ENEMY_TRACK_POSITIONS[getRandomInt(ENEMY_TRACK_POSITIONS.length)];
  this.speed = ENEMY_SPEEDS[getRandomInt(ENEMY_SPEEDS.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if(this.x > CANVAS_WIDTH) {
    this.reset();
  }
  else {
    this.x += (this.speed * dt);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.reset();
  this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function() {
  this.x  = PLAYER_START_POSITION_X;
  this.y = PLAYER_START_POSITION_Y;
};

Player.prototype.update = function(dt) {
  //check for right edge of the canvas.
  //player should not cross the canvas.
  if(this.x >= CANVAS_WIDTH ) {
    this.x = (this.x - COL_WIDTH);
  }
  //Check for left edge of the canvas
  if(this.x <= 0) {
    this.x = 0;
  }
  if(this.y >= PLAYER_START_POSITION_Y ) {
    this.y = PLAYER_START_POSITION_Y;
  }
  //
  if(this.y <= 0)
  {
    this.reset();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};


Player.prototype.handleInput = function(keyCode) {
  switch(keyCode)
    {
      case 'left':
        this.x-= COL_WIDTH;
        break;
      case 'right':
        this.x+= COL_WIDTH;
        break;
      case 'up':
        this.y -= ROW_HEIGHT;
        break;
      case 'down':
        this.y += ROW_HEIGHT;
        break;
      default:
        break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };
  if(e.keyCode in allowedKeys) {
      e.preventDefault();
  }
  player.handleInput(allowedKeys[e.keyCode]);
});
