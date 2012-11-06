Circle.prototype  = new Shape();
function Circle(x, y, r, f){
    this.x      = x;
    this.y      = y;
    this.radio  = r;
    this.fill   = f;

    this.select = false;

}

Circle.prototype.clear = function() {
}

Circle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.fill;
    ctx.arc(this.x, this.y, this.radio, 0, 2*Math.PI, true);
    ctx.closePath();
    ctx.stroke();    
    ctx.fill();
}

Circle.prototype.isInside = function(x, y) {    
    var distancia = Math.sqrt(Math.pow(x-this.x,2) + Math.pow(y-this.y,2));

    if (distancia<=this.radio)
        return true;
    else
        return false;
}
