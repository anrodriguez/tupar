var canvas;
var ctx;

function init() {
    canvas  = document.getElementById("canvas");
    ctx     = canvas.getContext("2d");

var x=10, y=10, w=100, h=100;
var x2=100, y2=100;
    
    canvas.onmousedown  = mousedown;
    canvas.onmouseup    = mouseup;
    canvas.onmousemove  = mousemove;
    canvas.ondblclick   = mousedoubleclick;
    
    figuras = new List();
    var img = new Image();

    var c   = rgb(Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255));
    var c2   = rgb(Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255));
    img.src = './canvas.jpg';
    var c1  = ctx.createPattern(img, 'repeat');

    figuras.agregar(new Box(x, y, w, h, c));
    figuras.agregar(new Box(100, 100, 20, 20, c2));
    figuras.agregar(new Circle(x2, y2, 20, c1));
    
    draw();
    
    return; 
}

function mousedown(e) {
    figuras.isInside(e.layerX, e.layerY);
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
    figuras.moveTo(e.layerX, e.layerY);
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

