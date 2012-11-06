Piece.prototype  = new Box();

function Piece(id, x, y, w, h, img) {    
    this.id     = id;
    this.x      = x;
    this.y      = y;
    this.w      = w;
    this.h      = h;
    this.imagen = img;
}

Piece.prototype.setFill = function(f) {
    this.fill = f;
}

Piece.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.rect(this.x+1, this.y+1, this.w-2, this.h-2);
    ctx.putImageData(this.imagen, this.x, this.y);
    ctx.linewidth = 3;
    ctx.strokeStyle = this.fill;
    ctx.stroke();
}
