'use strict';


function SpeedMonster(){
	this.width = 32;
	this.height = 48;
	this.speed = 90;
	this.health = 200;
	this.gold = 30;

}

SpeedMonster.prototype = new MonsterBase();

SpeedMonster.prototype.setMonsterInfo = function(route, game) {

	


	this.route = route;


	this.layer = game.layer;
	this.game = game;

	this.sprite = new Kinetic.Sprite({
		x: 1,
		y: 1,
		image: this.game.assetsLoader.getImage('monster2Url'),
		animation: 'walking_front',
		animations: {
			walking_front: [
				// x, y, width, height (4 frames)
				0, 0, 32, 48,
				32, 0, 32, 48,
				64, 0, 32, 48,
				96, 0, 32, 48
				
			],
			walking_left: [
				// x, y, width, height (4 frames)
				0, 48, 32, 48,
				32, 48, 32, 48,
				64, 48, 32, 48,
				96, 48, 32, 48
			],
			walking_right: [
				// x, y, width, height (4 frames)
				0, 96, 32, 48,
				32, 96, 32, 48,
				64, 96, 32, 48,
				96, 96, 32, 48
			],
			walking_back: [
				// x, y, width, height (4 frames)
				0, 146, 32, 48,
				32, 146, 32, 48,
				64, 146, 32, 48,
				96, 146, 32, 48	
			]
		},
		frameRate: 7,
		frameIndex: 0
	});
	
	this.x = this.route[0].x;
	this.y = this.route[0].y;
	
	this.calculateScreenCoords();

	this.container = new Kinetic.Group({
		x: this.screenX,
		y: this.screenY,
		width: this.width,
		height: this.height
	});

	this.container.offsetX(this.width / 2);
	this.container.offsetY(this.height / 2);

	this.container.add(this.sprite);
	this.layer.add(this.container);
	this.sprite.start();
	this.layer.draw();
	
	this.moveTo(this.route[1].x, this.route[1].y);

};

