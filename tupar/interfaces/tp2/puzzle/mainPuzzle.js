var canvas;
var ctx;
var canvasMod;
var ctxMod;

var puzzle;

var img;
var imgMod;
var img_default = './imagenes/00.jpg';


function init() {
    canvas      = document.getElementById("canvas");
    ctx         = canvas.getContext("2d");

    canvasMod  = document.getElementById("canvasMod");
    ctxMod     = canvasMod.getContext("2d");
    
    var cantPiezaX = document.getElementById("cantX").value;
    var cantPiezaY = document.getElementById("cantY").value;
    
    img     = new Image();
    imgMod  = new Image();
    img.src = img_default;  

    canvas.onmousedown  = mousedown;
    canvas.onmouseup    = mouseup;
    canvas.onmousemove  = mousemove;
    
    img.onload = function() {
        puzzle   = new Puzzle(this, cantPiezaX, cantPiezaY);
        ctxMod.drawImage(this, 0, 0, canvasMod.width, canvasMod.height);
        draw();
    }    
    
    return; 
}

function draw(){
    clear();
    puzzle.draw(ctx);   
}
