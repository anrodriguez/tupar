function Shape(x, y) {
    this.x          = x;
    this.y          = y;
    this.selected   = false;
}


Shape.prototype.setSelected = function(estado){
    this.selected = estado;
}

Shape.prototype.isSelected = function() {
    return this.selected;
}

Shape.prototype.moveTo = function(x, y) {

    this.x = x;
    this.y = y;
}
