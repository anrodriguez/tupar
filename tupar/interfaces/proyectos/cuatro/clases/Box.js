Box.prototype  = new Shape();

function Box(x, y, w, h, f) {    
    this.x = x;
    this.y = y;
    
    this.w      = w;
    this.h      = h;
    this.fill   = f;
}

Box.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
    ctx.stroke();    
    if (this.isSelected())
        ctx.fillStyle = "red";
    else
        ctx.fillStyle = this.fill;
        
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fill();
}

Box.prototype.clear = function() {
    ctx.clearRect(this.x, this.y, this.w, this.h);
}

Box.prototype.isInside = function(x, y) {    
    if ((x>=this.x&&x<=this.x+this.w)&&(y>=this.y&&y<=this.y+this.h))
        return true;
    else
        return false;
}
