var BasicGame = BasicGame || {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {
  init: function() {
    this.scale.pageAlignHorizontally = true;
  },

  preload: function () {
    this.load.image('sky', 'img/sky.png');
    this.load.image('ground', 'img/platform.png');
    this.load.image('star', 'img/star.png');
    this.load.spritesheet('dude', 'img/dude.png', 32, 48);
  },

  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors = this.input.keyboard.createCursorKeys();
    this.state.start('Game')
  }
}
