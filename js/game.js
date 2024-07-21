var Game = {};

Game.preload = function(){
    Game.scene = this; // Handy reference to the scene (alternative to `this` binding)
    this.load.image('logo', 'assets/PhaserLogo.png');
    this.load.bitmapFont('font','assets/azo-fire.png','assets/azo-fire.xml')
};

Game.create = function(){
    var logo = this.add.image(config.width / 2, config.height / 2 - 100,'logo').setInteractive();
    logo.on('pointerdown',function(pointer){

        if (Game.scene.energy < 10){
            return;
        }

        Game.updateScore(10);
        Game.updateEnergy(-10);

        Game.scene.tweens.add(
            {
                targets: logo,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 50,
                yoyo: true
            }
        );

        // Add floating text
        var floatingText = Game.scene.add.bitmapText(pointer.x, pointer.y, 'font', '+10', 38).setOrigin(0.5);
        Game.scene.tweens.add({
            targets: floatingText,
            y: floatingText.y - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power1',
            onComplete: function() {
                floatingText.destroy();
            }
        });
    });

    this.scoreTxt = this.add.bitmapText(config.width / 2, logo.height - 300, 'font', '0', 76).setOrigin(0.5, 0.5);
    Game.setScore();

    this.energyTxt = this.add.bitmapText(config.width / 2, logo.y + 350, 'font', '5000/5000', 48).setOrigin(0.5, 0.5);
    Game.setEnergy();

    // Set up energy recovery every second
    this.time.addEvent({
        delay: 1000, // 1 second
        callback: Game.recoverEnergy,
        callbackScope: this,
        loop: true
    });
};

Game.setScore = function(){
    Game.scene.score = parseInt(localStorage.getItem('score')) || 5000;
    Game.scene.scoreTxt.setText(Game.scene.score);
};

Game.setEnergy = function(){
    Game.scene.energy = parseInt(localStorage.getItem('energy')) || 0;
    Game.scene.energyTxt.setText(Game.scene.energy + '/' + '5000');
};


Game.saveFile = function(){
    var file = {
        score: Game.scene.score,
    };
    localStorage.setItem('saveFile',JSON.stringify(file));
};

Game.loadFile = function(){
    var file = JSON.parse(localStorage.getItem('saveFile'));
    Game.scene.score = file.score;
};
// ##################"

Game.updateScore = function(increment){
    Game.scene.score += increment;
    Game.scene.scoreTxt.setText(Game.scene.score);
    localStorage.setItem('score',Game.scene.score);

    Game.scene.scoreTxt.setText(Game.scene.score);
};

Game.updateEnergy = function(increment){
    Game.scene.energy += increment;
    Game.scene.energyTxt.setText(Game.scene.energy);
    localStorage.setItem('energy',Game.scene.energy);

    Game.scene.energyTxt.setText(Game.scene.energy + '/' + '5000');
};

Game.recoverEnergy = function() {
    if(Game.scene.energy >= 5000){
        return;
    }
    Game.updateEnergy(5); // Increase energy by 5 every second
};

var config = {
    type: Phaser.AUTO,
    width: 764,
    height: 1366,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game',
    scene: [Game]
};

var game = new Phaser.Game(config);
