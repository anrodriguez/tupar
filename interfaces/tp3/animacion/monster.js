var canvasMonster;
var ctxMonster;
var img_monster = './imagenes/gb_walk.png';  //'./imagenes/monster.png';
var img_fondo   = './imagenes/pared1.gif';
var imgMonster, imgFondo;
var nFrame  = 6; // cantidad imagenes;
var frame   = 0;
var nFilas  = 3;
var offsetFilas = 0;
var rate    = 1000/10;
var imageReady = false;

var bgX             = -100;
var sentidoMonster  = '->';

var fondo;


function monster() {
    canvasMonster  = document.getElementById("widget1");
    ctxMonster     = canvasMonster.getContext("2d");

    imgMonster      = new Image();
    imgMonster.src  = img_monster;

    imgFondo      = new Image();
    imgFondo.src  = img_fondo;
        
    imgMonster.onload = loaded();

}

function loaded() {  
    imageReady = true;
    
    frameWidth  = imgMonster.width / nFrame;
    frameHeight = imgMonster.height / nFilas ;
    
    px = (canvasMonster.width /2) - frameWidth / 2;
    py = (canvasMonster.height /2) - frameHeight/ 2;
    
    fondo = new FondoAnimado(canvasMonster, ctxMonster, imgFondo, 10, 1);
    setInterval(redraw, rate);
}


function redraw() {

    ctxMonster.fillStyle = '#CCCCCC';
    ctxMonster.fillRect(0, 0, canvasMonster.width, canvasMonster.width);
    
    if(imageReady) {        
        ctxMonster.drawImage(imgFondo, bgX, 0, imgFondo.width, canvasMonster.height);
//        fondo.draw();
        ctxMonster.drawImage(imgMonster,                // Imagen
                            frame*frameWidth,           // Offset X
                            offsetFilas*frameHeight,    // offset Y
                            frameWidth, frameHeight,    // Ancho, Alto del Frame
                            px, py,                     // Posición del frame dentro del canvas
                            frameWidth, frameHeight     // Ancho, Alto a escala del Frame
                        );
    }
    
    frame++;
    if (frame>=nFrame)
        frame=0;
    
    if (sentidoMonster=='->') {
        bgX-=10;
        if (bgX<-400) {
            sentidoMonster = '<-';
            offsetFilas = 1
        }
    }
    else {
        bgX+=10;
        if (bgX>=0) {
            sentidoMonster = '->';
            offsetFilas = 0;
        }    
    }
}
