var __thisReloj;
function Reloj(idCanvas) {
    
    this.canvas = document.getElementById(idCanvas);
    this.ctx    = this.canvas.getContext("2d");
    
    this.now    = new Date();
    this.time   = 'null';
    this.fecha  = 'null';
    this.dt = 50;
    
    if (this.canvas.width<100) {
        alert('El ancho del canvas contenedor debe ser mayor o igual a 100 pixels');
        return;
    }

    if (this.canvas.height<100) {
        alert('El alto del canvas contenedor debe ser mayor o igual a 100 pixels');
        return;
    }

    this.centro_x    = this.canvas.width /2;
    this.centro_y    = this.canvas.height /2;
    
    this.lonHH       = (this.canvas.width/2) *0.5;
    this.lonMM       = (this.canvas.width/2) *0.7;
    this.lonSS       = (this.canvas.width/2) *0.8;

    this.digitalFillStyle   = 'green';
    if (this.canvas.width<200) 
        this.digitalFont        = '10px sans-serif';
    else
        this.digitalFont        = '15px sans-serif';
    
    this.digitalOn      = true;
    this.analogicoOn    = true;
    this.dateOn         = true;


    var instancia = this;
    setInterval(function() {instancia.update();}, this.dt);
  
    this.crearEventos();
    __thisReloj = this;
}

Reloj.prototype.clear = function() {
    this.canvas.width=this.canvas.width;
}

Reloj.prototype.leerTime = function() {
    this.now         = new Date();
    this.hora        = this.now.getHours();
    this.minutos     = this.now.getMinutes();
    this.segundos    = this.now.getSeconds();
    this.angleHH     = 2 * Math.PI * (this.hora /12) - (Math.PI /2);
    this.angleMM     = 2 * Math.PI * (this.minutos /60) - (Math.PI /2);
    this.angleSS     = 2 * Math.PI * (this.segundos /60) - (Math.PI /2);

    if (this.hora<10)
        this.hora='0'+this.hora;
    if (this.minutos<10)
        this.minutos='0'+this.minutos;
    if (this.segundos<10)
        this.segundos='0'+this.segundos;
    
    this.time=this.hora+':'+this.minutos+':'+this.segundos;
}

Reloj.prototype.leerDate = function() {
    this.dia = this.now.getDate();
    this.mes = this.now.getMonth()+1;
    this.ani = this.now.getFullYear();

    if (this.dia<10)
        this.dia='0'+this.dia;
    if (this.mes<10)
        this.mes='0'+this.mes;

    this.fecha=this.dia+'/'+this.mes+'/'+this.ani;
}

Reloj.prototype.displayDigital = function() {
    this.ctx.fillStyle = this.digitalFillStyle;
    this.ctx.font      = this.digitalFont;
    this.ctx.fillText(this.time, 5, this.centro_y*1.9);
}

Reloj.prototype.displayFecha = function() {
    this.ctx.fillStyle = this.digitalFillStyle;
    this.ctx.font      = this.digitalFont;
    this.ctx.fillText(this.fecha, 5, this.centro_y*1.6);
}

Reloj.prototype.displayAnalogico = function() {
    
    var circulo = new Circle(this.centro_x, this.centro_y, this.canvas.width*0.45, 'lightgray');
    var marcas  = new List();
    marcas.agregar(new Box((this.canvas.width/2), 5, 5, 5, 'blue'));  
    marcas.agregar(new Box(5, (this.canvas.width/2)-5, 5, 5, 'blue'));
    marcas.agregar(new Box((this.canvas.width/2), this.canvas.height-10, 5, 5, 'blue'));
    marcas.agregar(new Box((this.canvas.width/2), this.canvas.height-10, 5, 5, 'blue'));
    marcas.agregar(new Box((this.canvas.width-10), (this.canvas.width/2)-5, 5, 5, 'blue'));
    
    circulo.draw(this.ctx);
    marcas.draw(this.ctx);
    
    var Dx = Math.cos(this.angleSS) * this.lonSS + this.centro_x;
    var Dy = Math.sin(this.angleSS) * this.lonSS + this.centro_y;
   
    this.ctx.lineWidth=1;
    this.ctx.strokeStyle="red";
    this.ctx.beginPath();
    this.ctx.moveTo(this.centro_x, this.centro_y);
    this.ctx.lineTo(Dx, Dy);
    this.ctx.stroke();
    
    Dx = Math.cos(this.angleMM) * this.lonMM + this.centro_x;
    Dy = Math.sin(this.angleMM) * this.lonMM + this.centro_y;
    this.ctx.lineWidth=4;
    this.ctx.strokeStyle="black";
    this.ctx.beginPath();
    this.ctx.moveTo(this.centro_x, this.centro_y);
    this.ctx.lineTo(Dx, Dy);
    this.ctx.stroke();

    Dx = Math.cos(this.angleHH) * this.lonHH + this.centro_x;
    Dy = Math.sin(this.angleHH) * this.lonHH + this.centro_y;
    this.ctx.strokeStyle="green";
    this.ctx.lineWidth=4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centro_x, this.centro_y);
    this.ctx.lineTo(Dx, Dy);    
    this.ctx.stroke();    
    
    this.ctx.closePath();

}

Reloj.prototype.update = function() {
    
    this.leerDate();
    this.leerTime();
    this.display();
}

Reloj.prototype.display = function() {
    this.clear();
    if (this.analogicoOn)
        this.displayAnalogico();

    if (this.digitalOn)
        this.displayDigital();    

    if (this.dateOn)
        this.displayFecha();    
}

Reloj.prototype.crearEventos = function() {
        this.canvas.title   = "Click para configurar...";
        this.canvas.onclick =   function () {
                                    var WinSettings = "center:yes;resizable:no;dialogHeight:300px;dialog Width:300px;html:hello"
                                    var titl="<TITLE>Configurar Reloj</TITLE> ";
                                    var scrst="<scr";
                                    var scrend="ipt>";

                                    var js= scrst + "ipt language=\"javascript\">"
                                            +" function Done() { "
                                            +" var o = new Object();    o.color = idColor.value;"
                                            +" o.digitalOn = idDigital.checked;"
                                            +" o.analogicoOn = idAnalogico.checked;"
                                            +" o.dateOn = idFecha.checked;"
                                            +" o.font = idFont.value;"
                                            +" window.returnValue = o; "
                                            +" this.analogicoOn = false; "
                                            +" window.close();"
                                            +" } "
                                            +" function Exit() { "
                                            +" window.close(); "
                                            +" } "
                                            +" </scr" + scrend;

                                    var bdy= ""
                                            +"  <input id=\"idDigital\" type=\"checkbox\" name=\"digital\" value=\"Digital\" checked=\"checked\"> Digital<br>"
                                            +"  <input id=\"idAnalogico\" type=\"checkbox\" name=\"analogico\" value=\"Analogico\" checked=\"checked\"> Anal&oacute;gico<br>"
                                            +"  <input id=\"idFecha\" type=\"checkbox\" name=\"fecha\" value=\"Fecha\" checked=\"checked\"> Fecha<br>"
                                            
                                            +" <p>Estilo: <select id=\"idFont\">"
                                            +" <option value=\"10px sans-serif\">Sans Serif 10</option>"
                                            +" <option value=\"15px sans-serif\">Sans Serif 15</option>"
                                            +" <option value=\"15px arial\">Arial 15</option>"
                                            +" </select>"
                                            +" Color: <select id=\"idColor\">"
                                            +" <option value=\"green\">Verde</option>"
                                            +" <option value=\"red\">Rojo</option>"
                                            +" <option value=\"blue\">Azul</option>"
                                            +" <option value=\"black\">Negro</option>"
                                            +" <option value=\"yellow\">Amarillo</option>"
                                            +" </select></p>"
                                            +" <TABLE width=200 >"
                                            +" <TR>"
                                            +" <TD width=50%><BUTTON size=150 onclick=\"Done()\" type=\"button\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aceptar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</BUTTON></TD>"
                                            +" <TD width=50%><BUTTON size=150 onclick=\"Exit()\" type=\"button\"> Cancelar </BUTTON></TD>"
                                            +" </TR>"
                                            +" </TABLE>";


                                    var pg="javascript:'<html><head>" + titl + js + "</head><body> "+ bdy +" </body></html>'";
                                    var oSettings = window.showModalDialog(pg,'',WinSettings);

                                    if (oSettings == null) {
                                        return false;
                                    }

                                    __thisReloj.digitalFillStyle   = oSettings.color;
                                    __thisReloj.digitalFont        = oSettings.font;
                                    if(oSettings.digitalOn)
                                        __thisReloj.digitalOn = true;
                                    else
                                        __thisReloj.digitalOn = false;
                                    
                                    if(oSettings.analogicoOn)
                                        __thisReloj.analogicoOn = true;
                                    else
                                        __thisReloj.analogicoOn = false;
                                    if(oSettings.dateOn)
                                        __thisReloj.dateOn = true;
                                    else
                                        __thisReloj.dateOn = false;
                                    
                                    return false;
                                };
                                

}
