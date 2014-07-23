'use strict';


function MonsterBase(){
	this.x = 0;
	this.y = 0;
	this.screenX = 0;
	this.screenY = 0;
	this.game = null;
	this.width = 0;
	this.height = 0;
	this.routeIndex = 0;
	this.speed = 1;
	this.eventEmitter = new EventEmitter();
	this.health = 0;
	this.routeIndex = 1;
	this.gold = 0;

	
}

MonsterBase.prototype.setMonsterInfo = function(route, layer){

	

};


MonsterBase.prototype.moveTo = function(coordX, coordY){
	var currentX = this.screenX;
	var currentY = this.screenY;
	this.x = coordX;
	this.y = coordY;
	this.calculateScreenCoords();
	

	
	var dx = this.screenX - currentX;
	var dy = this.screenY - currentY;
	var dist = Math.sqrt(dx * dx + dy * dy);
	
	var direction = '';
	var tweenDuration = parseFloat(dist / this.speed).toFixed(3);
	var self = this;

	
	
	if(this.screenX > currentX){
		direction = 'walking_right';
	} else if(this.screenX < currentX){
		direction = 'walking_left';
	} else if(this.screenY < currentY){
		direction = 'walking_back';
	} else {
		direction = 'walking_front';
	}
	
	this.sprite.animation(direction);


	this.routeIndex++;
	
	var tween = new Kinetic.Tween({
	  node: this.container,
	  x : this.screenX,
	  y : this.screenY,
	  duration: tweenDuration,
	  easing: Kinetic.Easings.Linear,
	  onFinish: function(){	 
		if(!self.isAlive()){
			return false;
		}
		  
		if(self.routeIndex >= self.route.length){
			self.game.looseLife();
			self.container.remove();
			self.eventEmitter.emit('monsterDead', self);
			return;
		}
		  
		if(self.route[self.routeIndex]){
			self.moveTo(self.route[self.routeIndex].x, self.route[self.routeIndex].y);
		} 
		
		
		
	  }
	}).play();
	
	

};



MonsterBase.prototype.die = function(){
	this.game.gold += this.gold;
	$('#gold').html(this.game.gold);
	
	this.container.remove();
	this.eventEmitter.emit('monsterDead', this);
};

MonsterBase.prototype.calculateScreenCoords = function(){
	this.screenX = this.x * this.game.coordWidth - this.game.coordWidth / 2;
	this.screenY = this.y * this.game.coordHeight - this.game.coordHeight / 2;
};


MonsterBase.prototype.sustainDamage = function(damage){
	if(!this.isAlive()){
		return false;
	}
	this.health -= damage;
	if(this.health <= 0){
		this.die();
	}
};

MonsterBase.prototype.isAlive = function(){
	return this.health > 0;
};
