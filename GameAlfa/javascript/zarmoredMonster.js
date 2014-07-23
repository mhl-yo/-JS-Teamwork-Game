'use strict';


function ArmoredMonster(){
	this.width = 32;
	this.height = 48;
	this.speed = 90;
	this.health = 400;
	this.gold = 40;
}

ArmoredMonster.prototype = new MonsterBase();

ArmoredMonster.prototype.setMonsterInfo = function(route, game) {

	


	this.route = route;


	this.layer = game.layer;
	this.game = game;

	this.sprite = new Kinetic.Sprite({
		x: 1,
		y: 1,
		image: this.game.assetsLoader.getImage('monster3Url'),
		animation: 'walking_front',
		animations: {
			walking_front: [
				// x, y, width, height (4 frames)
				0, 0, 40, 56,
				40, 0, 40, 56,
				80, 0, 40, 56,
				120, 0, 40, 56
				
			],
			walking_left: [
				// x, y, width, height (4 frames)
				0, 56, 40, 56,
				40, 56, 40, 56,
				80, 56, 40, 56,
				120, 56, 40, 56
			],
			walking_right: [
				// x, y, width, height (4 frames)
				0, 112, 40, 56,
				40, 112, 40, 56,
				80, 112, 40, 56,
				120, 112, 40, 56
			],
			walking_back: [
				// x, y, width, height (4 frames)
				0, 168, 40, 56,
				40, 168, 40, 56,
				80, 168, 40, 56,
				120, 168, 40, 56	
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

