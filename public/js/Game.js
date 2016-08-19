$(document).ready(function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', { preload: preload, create: create, update: update });

  var platforms;
  var platforms;
  var cursors;
  var stars;
  var starsCollected = 0;
  var timesJumped = 0;
  var jumpedText;
  var jumpButton;

  function preload() {
    game.load.image('sky', 'img/sky.png');
    game.load.image('ground', 'img/platform.png');
    game.load.image('star', 'img/star.png');
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);

  }

  function create() {
    //enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors = game.input.keyboard.createCursorKeys();

    //add backdrop
    game.add.sprite(0, 0, 'sky');

    jumpedText = game.add.text(16, 16, 'Jumped 0 Times', {fontSize: '32px', fill: '#000'});

    //add ground and platforms
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    //game.add.sprite(0, 0, 'star');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    var roof = platforms.create(0, -43, 'ground');
    roof.scale.setTo(2, 2);
    roof.body.immovable = true;
    //ledges on the right side
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(600, 70, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 150, 'ground');
    ledge.body.immovable = true;
    //ledges on the left side
    ledge = platforms.create(-100, 270, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-330, 77, 'ground');
    ledge.body.immovable = true;

    //add player
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //define player physics
    game.physics.arcade.enable(player);
    player.body.bounce.y = .01;
    player.body.gravity.y = 1400;
    player.body.collideWorldBounds = true;

    //define player animation
    player.animations.add('left', [0,1, 2, 3,], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //make some collecty bits
    stars = game.add.group();
    stars.enableBody = true;
    //create stars above platforms
    for (var i = 0; i < 7; i++){
      var star = stars.create(i * 100, 0, 'star');
      star.body.gravity.y = 200;
      star.body.bounce.y = .8 + Math.random() * .2;
    }
    //create stars on ground
    for (var i = 2; i < 5; i++){
      var star = stars.create(i * 200, 500, 'star');
      star.body.gravity.y = 200;
      star.body.bounce.y = .8 + Math.random() * .2;
    }
  }

  function update() {
    //implement collision with platforms
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(player, platforms);
    //call ability to collect star
    game.physics.arcade.overlap(player, stars, checkTotal, collectStar, this);

    //Implement controls
    player.body.velocity.x = 0;
    if (cursors.left.isDown){
      player.body.velocity.x = -150;
      player.animations.play('left');
    }
    else if (cursors.right.isDown){
      player.body.velocity.x = 150;
      player.animations.play('right');
    }
    else{
      player.animations.stop();
      player.frame = 4;
    }
    if (jumpButton.isDown && player.body.touching.down){
      player.body.velocity.y = -750;
      timesJumped += 1
      jumpedText.text = 'Jumped ' + timesJumped + ' Times'
    }
    if (jumpButton.isDown && player.body.touching.up){
      player.body.velocity.y = 750;
      timesJumped += 1
      jumpedText.text = 'Jumped ' + timesJumped + ' Times'
    }

  }

  //function that allows up to collect a star
  function collectStar(player, star){
    star.kill();
    starsCollected += 1;
    if(player.body.gravity.y == 1400){
      player.body.gravity.y = -1500;
    }
    else{
      player.body.gravity.y = 1400;
    }
  }

  function checkTotal(player, star){
    if (starsCollected == stars.length - 1){
      $('#score-submit').toggleClass('hidden');
    }
  }
  $(document).on('submit', '#score-submit', function(event) {
    event.preventDefault();
    /* Act on the event */
    var sheet = $(this).find('#score-sheet');
    var finalScore = $(sheet).find('.timesJumped');
    formData = sheet.serialize();
    $(finalScore).val(timesJumped)
    console.log(finalScore);
    console.log(formData);

  });
});
