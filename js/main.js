// carga este script solo cuando se haya cargado el resto de la pagina
document.addEventListener("DOMContentLoaded", function(ev){
    var W = 800;
    var H = 480;
    // width, height, grpahics_type, container_div_id, config
    var game = new Phaser.Game(W,H, Phaser.AUTO, 'game', {
        preload: preload,
        create:  create,
        update:  update
    });
    
    // en esta funcion se cargan los recursos 
    function preload(){
        // asset_id, img_file
        game.load.image('pj1', 'images/pj1.jpg');
        game.load.image('pj2', 'images/pj2.jpg');  
        game.load.image('ground', 'images/ground.png'); // rectangulo blanco 20x20
        game.load.image('tile', 'images/tile.png');
        
        // asset_id, img_file, font_file
        game.load.bitmapFont('prstart', 'fonts/prstart.png', 'fonts/prstart.fnt'); 
    }
    
    // atributos del juego
    var platforms;
    var player1;
    var player2;
    var cursors;
    var wasd;
    
    // esta funcion sirve de constructor del juego
    function create(){
    
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        platforms = game.add.group();
        platforms.enableBody = true;
        
        var ground = platforms.create(0, 400, 'ground');
        ground.body.immovable = true;
        
        player1 = game.add.sprite(32, 300, 'pj1');
        player1.scale.setTo(0.3,0.3);
        
        game.physics.arcade.enable(player1);
        player1.body.bounce.y = 0.2;
        player1.body.gravity.y = 400;
        player1.body.collideWorldBounds = true;
        
        player2 = game.add.sprite(W-150, 200, 'pj2');
        player2.scale.setTo(0.1, 0.1);
        
        game.physics.arcade.enable(player2);
        player2.body.bounce.y = 0.2;
        player2.body.gravity.y = 400;
        player2.body.collideWorldBounds = true;
        
        // dibuja la linea del suelo
        var pencil = game.add.graphics(0,0);
        pencil.lineStyle(1, 0xFF0000, 1); // color hexadecimal
        pencil.moveTo(0, 400);
        pencil.lineTo(800, 400);
        
        // x,y, asset_id, string, text_size
        game.add.bitmapText(120, 100, 'prstart', 'Get ready for the next battle', 20);
        
        cursors = game.input.keyboard.createCursorKeys();
        wasd = game.input.keyboard.addKeys({
                 'up'   : Phaser.KeyCode.W,
                 'left' : Phaser.KeyCode.A,
                 'down' : Phaser.KeyCode.S,
                 'right': Phaser.KeyCode.D 
        });
    }
    
    function update(){
        game.physics.arcade.collide(player1, platforms);
        game.physics.arcade.collide(player2, platforms);
        game.physics.arcade.collide(player1, player2);
        
        player2.body.velocity.x = 0;
        if(cursors.right.isDown){
            player2.body.velocity.x = 150;
        }
        else if(cursors.left.isDown){
            player2.body.velocity.x = -150;
        }
        
        if(cursors.up.isDown && player2.body.touching.down){
            player2.body.velocity.y = -300;
        }
        
        player1.body.velocity.x = 0;
        if(wasd.right.isDown){
            player1.body.velocity.x = 150;
        }
        else if(wasd.left.isDown){
            player1.body.velocity.x = -150;
        }
        
        if(wasd.up.isDown && player1.body.touching.down){
            player1.body.velocity.y = -300;
        }
        
    }
});