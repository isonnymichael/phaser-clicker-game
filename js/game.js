var Game = {};

/**
 * Preload assets required for the game.
 */
Game.preload = function() {
    Game.scene = this; // Handy reference to the scene (alternative to this binding)
    this.load.image('logo', 'assets/PhaserLogo.png');
    this.load.image('task', 'assets/task.png');
    this.load.image('friend', 'assets/friend.png');
    this.load.image('boost', 'assets/boost.png');
    this.load.bitmapFont('font', 'assets/azo-fire.png', 'assets/azo-fire.xml');
};

/**
 * Create the game scene, including the logo, score and energy displays, and buttons.
 */
Game.create = function() {
    var { width, height } = config;
    var centerX = width / 2;
    var centerY = height / 2;

    // Add logo and set up interaction
    var logo = this.add.image(centerX, centerY - 100, 'logo').setInteractive();
    logo.on('pointerdown', function(pointer) {
        if (Game.scene.energy < 10) return;

        Game.updateScore(10);
        Game.updateEnergy(-10);

        // Add tween animation
        Game.scene.tweens.add({
            targets: logo,
            scaleX: 0.9,
            scaleY: 0.9,
            duration: 50,
            yoyo: true
        });

        // Add floating text
        var floatingText = Game.scene.add.bitmapText(pointer.x, pointer.y, 'font', '+10', 38).setOrigin(0.5);
        Game.scene.tweens.add({
            targets: floatingText,
            y: floatingText.y - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => floatingText.destroy()
        });
    });

    // Display score and energy
    this.scoreTxt = this.add.bitmapText(centerX, centerY - 400, 'font', '0', 76).setOrigin(0.5);
    Game.setScore();

    this.energyTxt = this.add.bitmapText(centerX, centerY + 350, 'font', '5000/5000', 48).setOrigin(0.5);
    Game.setEnergy();

    // Add buttons at the bottom
    var buttonY = height - 100; // Adjust the Y position of the buttons
    var buttonSpacing = 230;

    var taskButton = this.add.image(centerX - buttonSpacing, buttonY, 'task').setInteractive();
    var friendButton = this.add.image(centerX, buttonY, 'friend').setInteractive();
    var boostButton = this.add.image(centerX + buttonSpacing, buttonY, 'boost').setInteractive();

    // Set button interactions
    taskButton.on('pointerdown', () => alert('Task button clicked'));
    friendButton.on('pointerdown', () => alert('Friend button clicked'));
    boostButton.on('pointerdown', () => alert('Boost button clicked'));

    // Set up energy recovery every second
    this.time.addEvent({
        delay: 1000, // 1 second
        callback: Game.recoverEnergy,
        callbackScope: this,
        loop: true
    });

    // Calculate offline recharge
    Game.calculateOfflineRecharge();
};

/**
 * Set the score display to the stored score or default to 0.
 */
Game.setScore = function() {
    Game.scene.score = parseInt(localStorage.getItem('score')) || 0;
    Game.scene.scoreTxt.setText(Game.scene.score);
};

/**
 * Set the energy display to the stored energy or default to 5000.
 */
Game.setEnergy = function() {
    Game.scene.energy = parseInt(localStorage.getItem('energy')) || 5000;
    Game.scene.energyTxt.setText(Game.scene.energy + '/5000');
};

/**
 * Save the current game state to localStorage.
 */
Game.saveFile = function() {
    var file = {
        score: Game.scene.score,
        energy: Game.scene.energy,
        timestamp: Date.now() // Save current timestamp
    };
    localStorage.setItem('saveFile', JSON.stringify(file));
};

/**
 * Load the game state from localStorage.
 */
Game.loadFile = function() {
    var file = JSON.parse(localStorage.getItem('saveFile'));
    Game.scene.score = file.score;
    Game.scene.energy = file.energy;
    Game.scene.timestamp = file.timestamp;
};

/**
 * Update the score by the given increment and save it to localStorage.
 * @param {number} increment - The amount to increase or decrease the score.
 */
Game.updateScore = function(increment) {
    Game.scene.score += increment;
    Game.scene.scoreTxt.setText(Game.scene.score);
    localStorage.setItem('score', Game.scene.score);
};

/**
 * Update the energy by the given increment and save it to localStorage.
 * @param {number} increment - The amount to increase or decrease the energy.
 */
Game.updateEnergy = function(increment) {
    Game.scene.energy += increment;
    Game.scene.energyTxt.setText(Game.scene.energy + '/5000');
    localStorage.setItem('energy', Game.scene.energy);
};

/**
 * Recover energy by 5 units every second, ensuring it does not exceed the maximum.
 */
Game.recoverEnergy = function() {
    if (Game.scene.energy >= 5000) return;
    Game.updateEnergy(5); // Increase energy by 5 every second
};

/**
 * Calculate and apply the energy recharge based on the time elapsed since the last save.
 */
Game.calculateOfflineRecharge = function() {
    var file = JSON.parse(localStorage.getItem('saveFile'));
    if (file && file.timestamp) {
        var lastTime = file.timestamp;
        var currentTime = Date.now();
        var timeElapsed = currentTime - lastTime;

        var secondsElapsed = Math.floor(timeElapsed / 1000);
        var energyToRecharge = Math.floor(secondsElapsed * 5);
        
        if (energyToRecharge + Game.scene.energy > 5000) {
            energyToRecharge = 5000 - Game.scene.energy;
        }
        Game.updateEnergy(energyToRecharge);
    }
};

// Save the game state before the window unloads
window.addEventListener('beforeunload', Game.saveFile);

var config = {
    type: Phaser.AUTO,
    width: 764,
    height: 1366,
    backgroundColor: '#2c3e50',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game',
    scene: [Game]
};

var game = new Phaser.Game(config);
