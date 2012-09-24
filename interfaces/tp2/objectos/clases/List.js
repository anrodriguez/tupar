function List(){
    this.shapes     = [];
    this.actual     = -1;
    
    this.desde      = -1;
    this.hasta      = -1;
}

List.prototype.init = function() {
    this.shapes     = [];
    this.actual     = -1;
    
    this.desde      = -1;
    this.hasta      = -1;
}

List.prototype.agregar = function(figura) {
    this.shapes.push(figura);
}

List.prototype.draw = function(ctx) {
    for (var i=0; i<this.shapes.length; i++) {
        this.shapes[i].draw(ctx);
    }

    if (this.actual!=-1)
        this.shapes[this.actual].draw(ctx);
}

List.prototype.isInside = function(x, y) {
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
        
        if (this.desde!=-1&&this.hasta!=-1){
            this.intercambiar(this.desde, this.hasta);
        }
    }

}

List.prototype.intercambiar = function(desde, hasta) {
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
    
    if (this.resultado())
        alert ('Felicitaciones!.');

}

List.prototype.resultado = function() {
    for (var i=0; i<this.shapes.length; i++) {
        if (this.shapes[i].id!=i)
            return false;
    }
    return true;
}

List.prototype.isInsideMove = function(x, y) { 
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

List.prototype.moveTo = function(x, y) {
    if (this.actual>=0&&this.actual<=this.shapes.length)
    this.shapes[this.actual].moveTo(x, y);
}

List.prototype.desordenar = function() {
    for (var i=0; i<this.shapes.length; i++) {
        var j = Math.round(Math.random()*(this.shapes.length-1));
        this.intercambiar(j, i);
    }
}