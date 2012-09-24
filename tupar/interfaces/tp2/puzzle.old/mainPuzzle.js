var canvas;
var ctx;
var canvasMod;
var ctxMod;

var puzzle;

var img;
var imgMod;
var img_default = 'imagenes/00.jpg';


function init() {
    canvas      = document.getElementById("canvas");
    ctx         = canvas.getContext("2d");

    canvasMod  = document.getElementById("canvasMod");
    ctxMod     = canvasMod.getContext("2d");
    
    var cantPiezaX = document.getElementById("cantX").value;
    var cantPiezaY = document.getElementById("cantY").value;
    
    var w=canvas.width/cantPiezaX;
    var h=canvas.height/cantPiezaY;

    img     = new Image();
    imgMod  = new Image();
    img.src = img_default;  


    canvas.onmousedown  = mousedown;
    canvas.onmouseup    = mouseup;
    canvas.onmousemove  = mousemove;
    canvas.ondblclick   = mousedoubleclick;
       
    puzzle   = new Puzzle();
//    puzzle.init();
//    puzzle.setImagen(img);     
//    puzzle.setSize(cantPiezaX, cantPiezaY);
    
    img.onload = function() {
        //ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
puzzle.init();
  
//        puzzle.setImagen(this);      
  
  
        var id = 0;
        for(var i=0; i<cantPiezaX; i++) 
            for(var j=0; j<cantPiezaY; j++) {
                var p = new Piece(id++, i*w, j*h, w, h, getSubImage(this, i*w, j*h, w, h));
                p.setFill('black');
                puzzle.agregar(p);
            }
                    


      ctxMod.drawImage(this, 0, 0, canvasMod.width, canvasMod.height);
      puzzle.desordenar();
      draw();
    }    
    
    return; 
}


function getSubImage(img, x, y, w, h) {
    ctx.drawImage(img, 0, 0);   
    return ctx.getImageData(x, y, w, h);
}


function draw(){
    clear();
    puzzle.draw(ctx);   
}
