function Cuatro(cantX, cantY){
    this.tablero = new List();
    
    if (cantX>3&&cantX<=25)
        this.cantPiezaX = cantX;
    else {
        if (cantX<4)
            this.cantPiezaX = 4;
        else
            this.cantPiezaX = 25;
    }

    if (cantY>3&&cantY<=20)
        this.cantPiezaY = cantY;
    else {
        if (cantY<4)
            this.cantPiezaY = 4;
        else
            this.cantPiezaY = 20;
    }
    
    this.initTablero();
        
}

Cuatro.prototype.initTablero = function(){
    
    var id = 0;
    
    var w=canvas.width/this.cantPiezaX;
    var h=canvas.height/this.cantPiezaY;

    for(var i=0; i<this.cantPiezaX; i++) 
        for(var j=0; j<this.cantPiezaY; j++) {
            var ficha = new FichaCuatro(id++, i*w+20, j*h+20, 10);
            this.tablero.agregar(ficha);
    }
}

Cuatro.prototype.draw = function(ctx) {
    this.tablero.draw(ctx);
}


// Retornar indice de la figura dentro de la cual se hallan el Punto(x, y)
Cuatro.prototype.getIndexShape = function(x, y) {
    
    for (var i=0; i<this.tablero.getLength(); i++) {
        var ficah = this.tablero.getElement(i);
        if (ficah.isInside(x, y))
                return(i);
    }        
    return -1; 
}

Cuatro.prototype.setFicha = function(jugador, x, y) {
    
    var posFicha = this.getIndexShape(x, y);

    if (posFicha!=-1) {
        var ficha = this.tablero.getElement(posFicha);
        if(jugador==1)
            ficha.fill = 'red';
        else
            ficha.fill = 'blue';
        this.tablero.setElement(ficha, posFicha);
    }
}