function List(){
    this.shapes     = [];
    this.tope       = -1;
    
}

List.prototype.agregar = function(figura) {
    this.shapes.push(figura);
}

List.prototype.draw = function(ctx) {
    for (var i=0; i<this.shapes.length; i++) {
        this.shapes[i].draw(ctx);
    }
}

// Retornar indice de la figura dentro de la cual se hallan el Punto(x, y)
List.prototype.getIndexShape = function(x, y) {
    for (var i=0; i<this.shapes.length; i++)
        if (this.shapes[i].isInside(x, y))
                return(i);
    return -1; 
}

// Selecciona la figura almacena en shapes[i];
List.prototype.selectShape = function(i) {
    this.shapes[i].setSelected(true);   
}

// Deselecciona la figura almacena en shapes[i];
List.prototype.unSelectShape = function(i) {
    this.shapes[i].setSelected(false);   
}

List.prototype.getTope = function() {
    return this.tope;
}

List.prototype.setTope = function(i) {
    this.tope = i;
}

List.prototype.getShapeTope = function() {
    return this.shapes[this.tope];
}