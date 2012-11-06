Puzzle.prototype  = new List();

function Puzzle(){
    this.imagen     = null;
    this.cantPiezaX = 4;
    this.cantPiezaY = 4;
    
    this.desde      = -1;
    this.hasta      = -1;
    
    this.xOriginal  = -1;
    this.yOriginal  = -1;
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
            var p = new Piece(id++, i*w, j*h, w, h, this.getSubImage(i*w, j*h, w, h));
            p.setFill('black');
            this.agregar(p);
    }
}

Puzzle.prototype.getSubImage = function(x, y, w, h) {
    ctx.drawImage(this.imagen, 0, 0);   
    return ctx.getImageData(x, y, w, h);
}

Puzzle.prototype.init = function() {
    this.shapes     = [];
    this.actual     = -1;    
    this.desde      = -1;
    this.hasta      = -1;
}

Puzzle.prototype.draw = function(ctx) {
   for (var i=0; i<this.shapes.length; i++) {
        this.shapes[i].draw(ctx);
    }

       if (this.tope!=-1)
        this.shapes[this.tope].draw(ctx);
}


Puzzle.prototype.setDesde = function(x, y) {
    var pieza = this.getIndexShape(x, y);

    if (pieza!=-1) {
        this.shapes[pieza].setSelected(true);   
        this.desde = pieza;
    }
}

Puzzle.prototype.setHasta = function(x, y) {
    var pieza = this.getIndexShape(x, y);
    
    if (pieza!=-1) {
        this.hasta = pieza;
    }
}

Puzzle.prototype.getDesde = function() {
    return this.desde;
}

Puzzle.prototype.getHasta = function() {
    return this.hasta;
}

Puzzle.prototype.resultado = function() {
    for (var i=0; i<this.shapes.length; i++) {
        if (this.shapes[i].id!=i)
            return false;
    }
    return true;
}

/*
Puzzle.prototype.isInsideMove = function(x, y) { 
    for (var i=0; i<this.shapes.length; i++) {
        if (this.shapes[i].isInside(x, y)) {
            this.shapes[i].selected = true;   
            this.selectedX  = x;
            this.selectedY  = y;
            this.actual     = i;
            }
        else {
            this.shapes[i].select = false;
            this.selectedX  = -1;
            this.selectedY  = -1;
            }
    }
}
*/
Puzzle.prototype.savePosShape = function(i) {
    this.xOriginal = this.shapes[i].x;
    this.yOriginal = this.shapes[i].y;
}

Puzzle.prototype.restorePosShape = function(i) {
    this.shapes[i].x = this.xOriginal;
    this.shapes[i].y = this.yOriginal;
}


Puzzle.prototype.restoreXPosShape = function() {
    return this.xOriginal = this.xOriginal;
}

Puzzle.prototype.restoreYPosShape = function() {
    return this.yOriginal = this.yOriginal;
}

Puzzle.prototype.moveTo = function(x, y) {
    if (this.tope>=0&&this.tope<=this.shapes.length)
        this.shapes[this.tope].moveTo(x, y);
}

Puzzle.prototype.desordenar = function() {
    for (var i=0; i<this.shapes.length; i++) {
        var j = Math.round(Math.random()*(this.shapes.length-1));
        this.intercambiar(i, j);
    }
}
/*
Puzzle.prototype.isInside = function(x, y) {
    for (var i=0; i<this.shapes.length; i++) {
        if (this.shapes[i].isInside(x, y)) {
            if (this.desde==-1) {
                this.shapes[i].selected = true;   
                this.desde = i;
            }    
            else {
            if (this.hasta==-1)
                this.shapes[i].selected = true;   
                this.hasta = i;
            }
        }
        
        if (this.desde!=-1&&this.hasta!=-1) {
            this.intercambiar(this.desde, this.hasta);
        }
    }
}*/

Puzzle.prototype.jugar = function() {    
    this.intercambiar(this.desde, this.hasta);
        if (this.resultado())
            return true;//alert ('Felicitaciones!.');
        else
            return false;
}

Puzzle.prototype.intercambiar = function(desde, hasta) {
    var s = this.shapes[desde];
    var x = this.shapes[desde].x;
    var y = this.shapes[desde].y;
    this.shapes[desde].x = this.shapes[hasta].x;
    this.shapes[desde].y = this.shapes[hasta].y;
    this.shapes[hasta].x = x;
    this.shapes[hasta].y = y;
    
    this.shapes[desde] = this.shapes[hasta];
    this.shapes[hasta] = s;
    
    this.desde = -1;
    this.hasta = -1;
}
