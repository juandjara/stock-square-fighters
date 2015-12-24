// carga este script solo cuando se haya cargado el resto de la pagina
document.addEventListener("DOMContentLoaded", function(ev){
    var game = new Phaser.Game(800, 480, Phaser.AUTO, 'game', {
        preload: preload,
        create:  create
    });
    
    function preload(){
        // en esta funcion se cargan los recursos   
        
        // asset_id, img_file, font_file
        game.load.bitmapFont('prstart', 'fonts/prstart.png', 'fonts/prstart.fnt'); 
    }
    function create(){
        // esta funcion sirve de constructor del juego
        
        // dibuja la linea del suelo
        var pencil = game.add.graphics(0,0);
        pencil.lineStyle(1, 0xFF0000, 1); // color hexadecimal
        pencil.moveTo(0, 400);
        pencil.lineTo(800, 400);
        
        // x,y, asset_id, string, text_size
        game.add.bitmapText(150, 200, 'prstart', 'Work in progress', 32);
    }
});