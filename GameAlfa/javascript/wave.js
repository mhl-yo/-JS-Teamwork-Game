
function Wave(monstersType, route, game ){
	
	this.monstersCount = 10;
	this.mostersCreated = 0;
	this.route = route;
	this.game = game;
	this.layer = game.layer;
	this.monsterType = monstersType;
	this.eventEmitter = new EventEmitter();
	this.monsters = [];
	this.monstersType = monstersType;
	
	
}


Wave.prototype.spawn = function(){
	var interval = 0, i;
	
	var self = this;
	for(i = 0; i < this.monstersCount; i++){
		interval += 1500;
		setTimeout(function(){
			self.createMonster();
		}, interval);
	
	}	
	
};






Wave.prototype.createMonster = function(monsterType){
	// create monster acording to monsterType
	var monster;
	if(!this.game.gameRunning){
		return false;
	}
	
	if (this.monstersType === 'NormalMonster'){
		monster = new NormalMonster();
	} else if  (this.monstersType === 'ArmoredMonster'){
		monster = new ArmoredMonster();
	} else {
		monster = new SpeedMonster();
	}
	
	this.mostersCreated++;
	
	var self = this;
	monster.setMonsterInfo(this.route, this.game);
	
	this.monsters.push(monster);
	
	monster.eventEmitter.registerEvent('monsterDead', function(monster){
		var index = self.monsters.indexOf(monster);
		self.monsters.splice(index, 1);
		if(self.monsters.length === 0 && self.mostersCreated == self.monstersCount){
			self.eventEmitter.emit('waveCleared');
			
		}
	});
};


