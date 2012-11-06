function Puzzle(imagen, cantX, cantY){

    this.piezas = new List();

    this.imagen     = imagen;
    this.cantPiezaX = cantX;
    this.cantPiezaY = cantY;
    
    this.desde      = -1;
    this.hasta      = -1;
    
    this.xOriginal  = -1;
    this.yOriginal  = -1;
    this.dividirImagen();
    this.desordenar();
}

Puzzle.prototype.setSize = function (x, y) {
    this.cantPiezaX = x;
    this.cantPiezaY = y;
    this.dividirImagen();
}

Puzzle.prototype.setImagen = function(imagen) { 
    this.imagen = imagen;
    this.dividirImagen();
}

Puzzle.prototype.dividirImagen = function(){
    
    var id = 0;
    
    var w=canvas.width/this.cantPiezaX;
    var h=canvas.height/this.cantPiezaY;

    for(var i=0; i<this.cantPiezaX; i++) 
        for(var j=0; j<this.cantPiezaY; j++) {
            var pieza = new Piece(id++, i*w, j*h, w, h, this.getSubImage(i*w, j*h, w, h));
            pieza.setFill('black');
            this.piezas.agregar(pieza);
    }
}

Puzzle.prototype.getSubImage = function(x, y, w, h) {
    ctx.drawImage(this.imagen, 0, 0);   
    return ctx.getImageData(x, y, w, h);
}

Puzzle.prototype.draw = function(ctx) {
    this.piezas.draw(ctx);
}

Puzzle.prototype.setDesde = function(x, y) {
    var pieza = this.getIndexShape(x, y);

    if (pieza!=-1) {
        this.desde = pieza;
        this.setTope(pieza);
        this.savePosShape(pieza);
    }
}

Puzzle.prototype.setHasta = function(x, y) {
    this.restorePosShape(this.getDesde());
    var pieza = this.getIndexShape(x, y);
    
    if (pieza!=-1) {
        this.setTope(-1);   
        this.restorePosShape(this.getDesde());
        this.hasta = pieza;
    }    
}

Puzzle.prototype.getDesde = function() {
    return this.desde;
}

Puzzle.prototype.getHasta = function() {
    return this.hasta;
}


// Retornar indice de la figura dentro de la cual se hallan el Punto(x, y)
Puzzle.prototype.getIndexShape = function(x, y) {
    
    for (var i=0; i<this.piezas.getLength(); i++) {
        var pieza = this.piezas.getElement(i);
        if (pieza.isInside(x, y))
                return(i);
    }        
    return -1; 
}

Puzzle.prototype.setTope = function(i) {
    this.piezas.setTope(i);
}


Puzzle.prototype.resultado = function() {
    for (var i=0; i<this.piezas.getLength(); i++) {
        if (this.piezas.getElement(i).id!=i)
            return false;
    }
    return true;
}

Puzzle.prototype.savePosShape = function(i) {
    this.xOriginal = this.piezas.getElement(i).x;
    this.yOriginal = this.piezas.getElement(i).y;
}

Puzzle.prototype.restorePosShape = function(i) {
    var pieza = this.piezas.getElement(i);
    pieza.x = this.xOriginal;
    pieza.y = this.yOriginal;
    this.piezas.setElement(pieza, i);
}


Puzzle.prototype.restoreXPosShape = function() {
    return this.xOriginal;
}

Puzzle.prototype.restoreYPosShape = function() {
    return this.yOriginal;
}

Puzzle.prototype.moveTo = function(x, y) {
   pieza = this.piezas.getElement(this.piezas.getTope());
   pieza.moveTo(x, y);
   this.piezas.setElement(pieza, this.piezas.getTope());   
}

Puzzle.prototype.desordenar = function() {
    for (var i=0; i<this.piezas.getLength(); i++) {
        var j = Math.round(Math.random()*(this.piezas.getLength()-1));
        this.intercambiar(i, j);
    }
}

Puzzle.prototype.jugar = function() {    
    this.intercambiar(this.desde, this.hasta);
        if (this.resultado())
            return true;
        else
            return false;
}

Puzzle.prototype.intercambiar = function(desde, hasta) {
    var piezaDesde = this.piezas.getElement(desde);  
    var piezaHasta = this.piezas.getElement(hasta);  
    
    var x = piezaDesde.x;                           
    var y = piezaDesde.y;                           
    
    piezaDesde.x = piezaHasta.x;
    piezaDesde.y = piezaHasta.y;
    
    piezaHasta.x = x;
    piezaHasta.y = y;
    this.piezas.setElement(piezaDesde, hasta);
    this.piezas.setElement(piezaHasta, desde);
    
    this.desde = -1;
    this.hasta = -1;
}
