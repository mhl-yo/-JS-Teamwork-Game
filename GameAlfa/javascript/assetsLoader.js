'use strict';


function AssetsLoader(){
	this.images = {};
	this.imagesToLoad = 0;
	this.eventEmitter = new EventEmitter();

}


AssetsLoader.prototype.addImage = function(name, url){
	var image = new Image();
	var self = this; //reference to the right this
	this.images[name] = image;
	this.imagesToLoad++;
	
	image.onload = function(){
		self.imagesToLoad--;
		if(self.imagesToLoad === 0){
			self.ready();
		}
		
	};
	
	image.src = url;
	
};


AssetsLoader.prototype.getImage = function(name){
	return  this.images[name];
};


AssetsLoader.prototype.ready = function(){

	this.eventEmitter.emit('ready');
};