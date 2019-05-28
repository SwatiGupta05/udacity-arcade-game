let life = document.querySelector(".life");
let new_scores = document.querySelector("#scores");
// Enemies our player must avoid wherein x represent horizonal axis,
// y represent vertical axis and s represents speed.
var Enemy = function (x, y, s) {
	this.x = x;
	this.y = y;
	this.s = s;

	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// multiply speed by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.s * dt;
	if (this.x > 500) {
		this.reset();
	}
	this.checkCollisions();

};
// here we check the collision between player and enemy.
Enemy.prototype.checkCollisions = function () {
	if (player.x >= this.x - 60 && player.x <= this.x + 60) {
		if (player.y >= this.y - 60 && player.y <= this.y + 60) {
			player.life -= 1;
			if (player.life === 0) {
				alert("GAME OVER");
				initial_Life_Score();

			}
			player.resetPosition();
			getGems();
			updateInnerHtml();
		}
	}
}


//this will reset the of x axis to the initial position.
Enemy.prototype.reset = function () {
	this.x = 1;
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// this is our player class in which update(), render() and
// a handleInput(),gemCollision(),resetPosition(),checkPlayerWin() method exist.
var Player = function (x, y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-pink-girl.png';
	this.score = 0;
	this.life = 5;

};

Player.prototype.gemCollision = function () {
	gemArrs.forEach(function (gem) {
		if (gem.x >= player.x - 60 && gem.x <= player.x + 60) {
			if (gem.y >= player.y - 60 && gem.y <= player.y + 60) {
				player.score += gem.score;
				//deleting arr from gemArrsrr to hide gems.
				gemArrs.splice(gemArrs.indexOf(gem), 1);
				updateInnerHtml();
			}
		}
	});
};


Player.prototype.update = function (dt) {
	this.gemCollision();
};


Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.resetPosition = function () {
	this.x = 205;
	this.y = 405;
	player.score = 0;
	updateInnerHtml();
};


Player.prototype.checkPlayerWin = function () {
	if (player.y <= -15) {
		swal("Congratulation! You Won.");
		player.resetPosition();
	initial_Life_Score();
		getGems();
		updateInnerHtml();
	}
};


Player.prototype.handleInput = function (keyName) {
	if (keyName === "up" && this.y > 0) {
		this.y -= 20;
	} else if (keyName === "down" && this.y < 408) {
		this.y += 20;
	} else if (keyName === "right" && this.x < 408) {
		this.x += 20;
	} else if (keyName === "left" && this.x > 0) {
		this.x -= 20;

	}
	this.checkPlayerWin();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [
	new Enemy(1, 60, 220),
	new Enemy(1, 150, 150),
	new Enemy(1, 230, 180)
];

let player = new Player(205, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});


//gem display:
function getGems() {
	let parentGem = {
		update: function () {

		},
		render: function () {
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
	};

	let blueGem = Object.create(parentGem);
	blueGem.x = 103;
	blueGem.y = 220;
	blueGem.sprite = 'images/Gem-Blue.png';
	blueGem.score = 30;

	let heart = Object.create(parentGem);
	heart.x = 403;
	heart.y = 150;
	heart.sprite = 'images/Heart.png';
	heart.score = 20;

	let star = Object.create(parentGem);
	star.x = 203;
	star.y = 150;
	star.sprite = 'images/Star.png';
	star.score = 40;

	let key = Object.create(parentGem);
	key.x = 10;
	key.y = 70;
	key.sprite = 'images/Key.png';
	key.score = 50;

	let gemArrs = [blueGem, heart, star, key];
	window.gemArrs = gemArrs;
};
getGems();


//to update the scores and life in innerHTML.
function updateInnerHtml() {
	life.innerHTML = player.life;
	new_scores.innerHTML = player.score;
}


//setting life and scores to the initial level.
function initial_Life_Score(){
  player.life = 5;
  player.score = 0;
}
