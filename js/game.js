var Game = {};

Game.preload = function(){
    Game.scene = this; // Handy reference to the scene (alternative to `this` binding)
    this.load.image('logo', 'assets/PhaserLogo.png');
    this.load.bitmapFont('font','assets/azo-fire.png','assets/azo-fire.xml')
};

Game.create = function(){
    var logo = this.add.image(window.innerWidth / 2, window.innerHeight / 2,'logo').setInteractive();
    logo.on('pointerdown',function(pointer){
        Game.updateScore(10);

        Game.scene.tweens.add(
            {
                targets: logo,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 50,
                yoyo: true
            }
        );

    });


    var txt = this.add.bitmapText((window.innerWidth / 2) - 100, logo.height, 'font', 'SCORE:', 38).setOrigin(0);
    this.scoreTxt = this.add.bitmapText(txt.x+txt.width+10, logo.height, 'font', '0', 38).setOrigin(0);
    Game.setScore();
};

Game.setScore = function(){
    // Gets the value stored in localStorage, or 0 if nothing is found
    // Don't fortget to parseInt(), all values are stored as strings in localStorage
    Game.scene.score = parseInt(localStorage.getItem('score')) || 0;
    Game.scene.scoreTxt.setText(Game.scene.score);
};


// ### Alternate way to save, by bundling all data into a JSON file stored as a single localStorage entry ###
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
    // Updates the score and stores the new value in the localStorage
    Game.scene.score += increment;
    Game.scene.scoreTxt.setText(Game.scene.score);
    localStorage.setItem('score',Game.scene.score);
};

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game',
    scene: [Game]
};

var game = new Phaser.Game(config);
