'use strict';


function Tower_1(game) {
    this.game = game;
    this.layer = game.towersLayer;
    this.range = 120;
    this.interval = null;
    this.width = 50;
    this.height = 50;
    this.reloadInterval = 300;
    this.lastFired = 0;
    this.damage = 13;
    this.price = 50;

}


Tower_1.prototype = new TowerBase();

Tower_1.prototype.init = function (x, y) {
    this.screenX = x + this.width / 2;
    this.screenY = y + this.height / 2;
    var self = this;

    this.image = new Kinetic.Image({

        image: this.game.assetsLoader.getImage('tower1'),
        x: this.screenX,
        y: this.screenY,
        width: this.width,
        height: this.height
    });

    this.image.offsetX(this.width / 2);
    this.image.offsetY(this.height / 2);

    this.game.layer.add(this.image);
    this.game.layer.draw();

    setInterval(function () {
        self.scan();
    }, 100);





};

Tower_1.prototype.fire = function (monster) {
    var time = new Date().getTime();
    var self = this;
    if (time - this.reloadInterval < this.lastFired) {
        return;
    }
    this.lastFired = time;

    var spit = new Image();

    var circle = new Kinetic.Image({
        x: this.screenX,
        y: this.screenY,
        image: spit,
        width: 30,
        height: 20
    });
    spit.src = 'images/nakovSpit.png';
    /*
    var circle = new Kinetic.Circle({
      radius: 5,
      fill: '',
      stroke: 'yellow',
      x : this.screenX,
      y : this.screenY
    });
    */
    this.game.layer.add(circle);

    var tween = new Kinetic.Tween({
        node: circle,
        x: monster.screenX,
        y: monster.screenY,
        duration: 0.3,
        easing: Kinetic.Easings.Linear,
        onFinish: function () {
            circle.remove();
            monster.sustainDamage(self.damage);
        }
    });

    tween.play();
};




