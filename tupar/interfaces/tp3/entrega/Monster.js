var __mouseStatus;

var __posXCanvas;
var __posYCanvas;

function Monster(idCanvas) {
    this.canvas  = document.getElementById(idCanvas);
    this.ctx     = this.canvas.getContext("2d");

    __posXCanvas = this.canvas.offsetLeft;
    __posYCanvas = this.canvas.offsetTop;
    this.imagenActual = 0;
    this.img_monster = './imagenes/sprite_player2.png';//'./imagenes/monster1.png';//'./imagenes/sprite_player2.png';
    this.img_fondo   = './imagenes/pared1.gif';
    this.imageReady = false;

    this.rate           = 1000/10;
    this.bgX            = -210;
    this.nFrame         = 8; // cantidad imagenes;
    this.frame          = 0; // frame;  
    this.nFilas         = 4;
    this.offsetFilas    = 1;
    this.sentidoMonster = '->';
    
    __mouseStatus = 0;
    
    this.imgMonster      = new Image();
    this.imgMonster.src  = this.img_monster;

//    this.imgFondo      = new Image();
//    this.imgFondo.src  = this.img_fondo;
     this.imgMonster.onload = this.loaded();
         
    var instancia = this;
    setInterval(function() {instancia.caminar();}, this.rate);
    
    this.crearEventos();

}

Monster.prototype.loaded = function() {  
    this.imageReady = true;
    
    this.frameWidth  = (this.imgMonster.width / this.nFrame);
    this.frameHeight = (this.imgMonster.height / this.nFilas);
    
    this.px = (this.canvas.width /2) - this.frameWidth / 2;
    this.py = (this.canvas.height /2) - this.frameHeight/ 2;
}


Monster.prototype.caminar = function(e) {
  
    switch (__mouseStatus) {
        case 0:
            this.caminarIzquierda();
            break;
            
        case 1:
           this.caminarDerecha();
            break;
        
        case 2:
            this.caminarAdelante();
            break;
        
        case 3:
            this.caminarAtras();
            break;
    }
    
}

Monster.prototype.draw = function() {
    this.clear();
    
    if (this.imageReady) {        
        if (__mouseStatus!=9) {
            this.ctx.drawImage(this.imgMonster,                       // Imagen
                                this.frame*this.frameWidth,           // Offset X
                                this.offsetFilas*this.frameHeight,    // offset Y
                                this.frameWidth, this.frameHeight,    // Ancho, Alto del Frame
                                this.px, this.py,                     // Posición del frame dentro del canvas
                                this.frameWidth, this.frameHeight     // Ancho, Alto a escala del Frame
                            );
        }
    }    
}

Monster.prototype.caminarIzquierda = function() {

    this.frame++;
    if (this.frame>=this.nFrame)
        this.frame=0;
    this.bgX+=5;
    if (this.bgX>-210)
        this.bgX=-1010;
    this.offsetFilas = 1;
    this.draw();     
}


Monster.prototype.caminarDerecha = function() {

    this.frame++;
    if (this.frame>=this.nFrame)
        this.frame=0;
    this.bgX-=5;

    if (this.bgX<-1030)
        this.bgX=-210;
    this.offsetFilas = 2;
    this.draw();     
}

Monster.prototype.caminarAdelante = function() {

    this.frame++;
    if (this.frame>=this.nFrame)
        this.frame=0;

    this.offsetFilas = 0;
    this.draw();     
}

Monster.prototype.caminarAtras = function() {

    this.frame++;
    if (this.frame>=this.nFrame)
        this.frame=0;

    this.offsetFilas = 3;
    this.draw();     
}

Monster.prototype.clear = function() {
    this.canvas.width=this.canvas.width;
}

Monster.prototype.crearEventos = function() {
        
        this.canvas.onmouseover =   function () {
                                        __mouseStatus = 9;
                                    }
                                    
        this.canvas.onmouseout =   function () {
                                       __mouseStatus = -1;
                                };

        document.onmousemove =   function (e) {
                                        if (__mouseStatus!=9) {
                                            var x = e.pageX;
                                            var y = e.pageY;

                                            if (x<__posXCanvas)
                                                __mouseStatus = 0;

                                            if (x>__posXCanvas&&y<__posYCanvas)
                                                __mouseStatus = 3;

                                            if (x>__posXCanvas&&y>__posYCanvas)
                                                __mouseStatus = 2;

                                            if (x>__posXCanvas+100&&y>__posYCanvas)
                                                __mouseStatus = 1;                                            
                                        };
                                }
}

