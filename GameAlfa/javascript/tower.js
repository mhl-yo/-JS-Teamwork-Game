function TowerBase(){
	this.game = null;
	this.image = null;
	this.rotation = 0;
	this.screenX = 0;
	this.screenY = 0;
	this.range = 0;
	this.interval = null;
	this.reloadInterval = 0;
	this.lastFired = 0;
	this.damage = 0;
	this.price = 0;
	
}



TowerBase.prototype.isInRange = function(x, y){
	var dx = this.screenX - x;
	var dy = this.screenY - y;
	var dist = Math.sqrt(dx * dx + dy * dy);

	return dist <= this.range;
};


TowerBase.prototype.rotateTo = function(x, y){
	var dx = this.screenX - x;
	var dy = this.screenY - y;
	var angle = Math.atan2(dy, dx);
	angle = angle * 180 / Math.PI;

	this.image.rotation(angle);
};


TowerBase.prototype.fire = function(monster){
	var time = new Date().getTime();
	var self = this;
	if(time - this.reloadInterval < this.lastFired){
		return;
	}
	this.lastFired = time;
	var circle = new Kinetic.Circle({
	  radius: 5,
	  fill: 'red',
	  stroke: 'red',
	  x : this.screenX,
	  y : this.screenY
	});
	
	this.game.towersLayer.add(circle);
	
	var tween = new Kinetic.Tween({
	  node: circle,
	  x : monster.screenX,
	  y : monster.screenY,
	  duration: 0.3,
	  easing: Kinetic.Easings.Linear,
	  onFinish: function(){	 
		circle.remove();
		monster.sustainDamage(self.damage);
	  }
	});
	
	tween.play();
};



TowerBase.prototype.scan = function(){
	var i, j;
	var monsters = [];
	for(i = 0; i < this.game.waves.length; i++){
		for(j = 0; j < this.game.waves[i].monsters.length; j++){
			monsters.push(this.game.waves[i].monsters[j]);
		}
	}

	for(i = 0; i < monsters.length; i++){
		if(this.isInRange(monsters[i].screenX, monsters[i].screenY)){
			this.rotateTo(monsters[i].screenX, monsters[i].screenY);
			this.fire(monsters[i]);
			return;
		}
	}
	
};