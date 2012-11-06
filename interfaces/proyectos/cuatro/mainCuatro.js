var canvas;
var ctx;
var canvasMod;
var cuatro;
var jugador = 1;


function init() {
    canvas      = document.getElementById("canvas");
    ctx         = canvas.getContext("2d");
    
    var cantPiezaX = document.getElementById("cantX").value;
    var cantPiezaY = document.getElementById("cantY").value;
    
    canvas.onmousedown  = mousedown;
    canvas.onmouseup    = mouseup;
    canvas.onmousemove  = mousemove;

    cuatro  = new Cuatro(cantPiezaX, cantPiezaY);
    draw();
    
    return; 
}

function draw(){
    clear();
    cuatro.draw(ctx);   
}
