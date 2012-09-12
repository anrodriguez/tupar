function List(){
    this.shapes     = [];
    this.actual     = -1;
}

List.prototype.agregar = function(figura) {
    this.shapes.push(figura);
}

List.prototype.draw = function(ctx) {
    for (var i=0; i<this.shapes.length; i++) {
        this.shapes[i].draw(ctx);
    }
}

List.prototype.isInside = function(x, y) {
    
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
