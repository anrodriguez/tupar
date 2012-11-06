
function Clima(idCanvas) {
    this.canvas     = document.getElementById(idCanvas);
    this.ctx        = this.canvas.getContext("2d");

    this.imagenFile = './imagenes/clima.png';
    this.nFrame     = 5; // cantidad de imagenes por fila;
    this.nFilas     = 3; // cantidad de filas

    this.estado     = -1;
    this.setEstado(this.estado);
}

Clima.prototype.setEstado = function(estado) {
    
    if (estado<0||estado>14) {
        this.canvas.width=this.canvas.width;
        return;
    }
        
    this.estado  = (estado*1);      //  Convertir a nro.
    this.frame   = this.estado%5;   // frame a mostrar;  

    if (this.estado<5) {            // fila a utilizar
        this.offsetFilas = 0;} 
    else if (this.estado<=9&&this.estado>=5) {
        this.offsetFilas = 1;}
           else {
            this.offsetFilas = 2;
     } 
 
    this.imagen        = new Image();
    this.imagen.src    = this.imagenFile;
    this.imageReady    = false;        
    this.imagen.onload = this.loaded();
    this.draw();
}

Clima.prototype.loaded = function() {  
    this.imageReady = true;
    
    this.frameWidth  = (this.imagen.width / this.nFrame);
    this.frameHeight = (this.imagen.height / this.nFilas);
    
    this.px = (this.canvas.width /2) - this.frameWidth / 2;
    this.py = (this.canvas.height /2) - this.frameHeight/ 2;
}

Clima.prototype.draw = function() {

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

Clima.prototype.clear = function() {
    this.canvas.width=this.canvas.width;
}
