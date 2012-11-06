function FondoAnimado(canvas, ctx, imagen, cantX, cantY){
    this.canvas = canvas;
    this.ctx    = ctx;
    this.piezas = new List();
    this.imagen     = imagen;
    this.cantPiezaX = cantX;
    this.cantPiezaY = cantY;
    
    this.inicio = 0;
    this.dividirImagen();
}

FondoAnimado.prototype.setSize = function (x, y) {
    this.cantPiezaX = x;
    this.cantPiezaY = y;
    this.dividirImagen();
}

FondoAnimado.prototype.setImagen = function(imagen) { 
    this.imagen = imagen;
    this.dividirImagen();
}

FondoAnimado.prototype.dividirImagen = function(){
    
    var id = 0;
    
    var w=this.canvas.width/this.cantPiezaX;
    var h=this.canvas.height/this.cantPiezaY;

    for(var i=0; i<this.cantPiezaX; i++) 
        for(var j=0; j<this.cantPiezaY; j++) {
            var pieza = new Piece(id++, i*w, j*h, w, h, this.getSubImage(i*w, j*h, w, h));
            pieza.setFill('black');
            this.piezas.agregar(pieza);
    }
}

FondoAnimado.prototype.getSubImage = function(x, y, w, h) {
    this.ctx.drawImage(this.imagen, 0, 0);   
    return this.ctx.getImageData(x, y, w, h);
}

FondoAnimado.prototype.avanzar = function() {
    
    var finP = this.piezas.getElement(this.piezas.getLength()-1);

    for (var i=this.piezas.getLength()-2; i>=0; i--)
        this.piezas.setElement(this.piezas.getElement(i), i+1);

    this.piezas.setElement(finP, 0);
    
}

FondoAnimado.prototype.draw = function() {
    this.avanzar();
    this.piezas.draw(this.ctx);
}
