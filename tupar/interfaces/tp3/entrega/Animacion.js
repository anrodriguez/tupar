
function Animacion(idCanvas, imagen, rate, cantFrames, frameInicial, cantFilas, filaInicial) {
    this.canvas  = document.getElementById(idCanvas);
    this.ctx     = this.canvas.getContext("2d");
    
    this.imagenFile     = imagen;   
    this.frame          = frameInicial;
    this.nFilas         = cantFilas;
    this.offsetFilas    = filaInicial;
    this.rate           = rate;
    this.nFrame         = cantFrames;

    this.imagen        = new Image();
    this.imagen.src    = this.imagenFile;
    this.imageReady    = false;        
    this.imagen.onload = this.loaded();
    var instancia      = this;
    setInterval(function() {instancia.redraw();}, this.rate);

}
Animacion.prototype.loaded = function() {  
    this.imageReady = true;
    
    this.frameWidth  = (this.imagen.width / this.nFrame);
    this.frameHeight = (this.imagen.height / this.nFilas);
    
    this.px = (this.canvas.width /2) - this.frameWidth / 2;
    this.py = (this.canvas.height /2) - this.frameHeight/ 2;
}

Animacion.prototype.redraw = function() {

    this.frame++;
    if (this.frame>=this.nFrame)
        this.frame=0;
    this.offsetFilas = 0;
    this.draw();    
}

Animacion.prototype.draw = function() {

    this.clear();    

    if (this.imageReady) {        
        this.ctx.drawImage(this.imagen,                           // Imagen
                            this.frame*this.frameWidth,           // Offset X
                            this.offsetFilas*this.frameHeight,    // offset Y
                            this.frameWidth, this.frameHeight,    // Ancho, Alto del Frame
                            this.px, this.py,                     // Posición del frame dentro del canvas
                            this.frameWidth, this.frameHeight     // Ancho, Alto a escala del Frame
                        );
    }    
}

Animacion.prototype.clear = function() {
    this.canvas.width=this.canvas.width;
}
