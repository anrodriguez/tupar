var canvas;
var ctx;
var img;
var figuras;

function init() {
    canvas  = document.getElementById("canvas");
    ctx     = canvas.getContext("2d");
    
var cantPiezaX = 4, cantPiezaY = 4;

var w=canvas.width/cantPiezaX, h=canvas.height/cantPiezaY;
    
    canvas.onmousedown  = mousedown;
    canvas.onmouseup    = mouseup;
    canvas.onmousemove  = mousemove;
    canvas.ondblclick   = mousedoubleclick;
       
    figuras = new List();
    img = new Image();
    
    img.src = './60.jpg';  
    
    img.onload = function() {
        var id = 0;
        for(var i=0; i<cantPiezaX; i++) 
            for(var j=0; j<cantPiezaY; j++) {
                var p = new Piece(id++, i*w, j*h, w, h, getSubImage(this, i*w, j*h, w, h));
                p.setFill('black');
                figuras.agregar(p);
            }
        figuras.desordenar();
        draw();
    }    
    
    return; 
}


function getSubImage(img, x, y, w, h) {

    ctx.drawImage(img, 0, 0);   
    return ctx.getImageData(x, y, w, h);
  
}

function mousedown(e) {
    figuras.isInside(e.pageX - canvas.offsetLeft,e.pageY - canvas.offsetTop); //e.layerX, e.layerY);
    draw();   
}

function mouseup(e) {
    if (figuras.actual !=    (-1)) {
        figuras.shapes[figuras.actual].selected = false;
        figuras.actual = -1;
        draw();
    }
}

function mousemove(e){
    figuras.moveTo(e.pageX - canvas.offsetLeft,e.pageY - canvas.offsetTop);//e.layerX, e.layerY);
//    figuras.isInsideMove(e.pageX - canvas.offsetLeft,e.pageY - canvas.offsetTop); //e.layerX, e.layerY);
    draw();       
}

function mousedoubleclick(e) {
    figuras.isInside(e.layerX, e.layerY);
    draw();   
}

function draw(){
    clear();
    figuras.draw(ctx);   

}
