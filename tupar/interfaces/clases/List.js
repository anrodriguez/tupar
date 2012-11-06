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

    if (this.tope!=-1)
        this.shapes[this.tope].draw(ctx);
}

List.prototype.getLength = function() {
    return this.shapes.length;
}

List.prototype.getElement = function(i) {
    return this.shapes[i];
}

List.prototype.setElement = function(pieza, i) {
    return this.shapes[i] = pieza;
}

// Selecciona la figura almacenada en shapes[i];
List.prototype.selectShape = function(i) {
    this.shapes[i].setSelected(true);   
}

// Deselecciona la figura almacenada en shapes[i];
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