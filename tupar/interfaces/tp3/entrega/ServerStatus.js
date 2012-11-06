var __thisServerStatus;
var __RequestObject;

function ServerStatus(idCanvas) {
    
    this.canvas = document.getElementById(idCanvas);
    this.ctx    = this.canvas.getContext("2d");
    
    if (this.canvas.width<100) {
        alert('El ancho del canvas contenedor debe ser mayor o igual a 100 pixels');
        return;
    }

    if (this.canvas.height<100) {
        alert('El alto del canvas contenedor debe ser mayor o igual a 100 pixels');
        return;
    }

    this.digitalOn      = true;
    this.analogicoOn    = true;

    this.cpu_01_min = 0;
    this.cpu_05_min = 0;
    this.cpu_15_min = 0;
    
    this.mem_bytes      = 0;
    this.mem_used_bytes = 0;

    this.timer          = 3000;
    this.w              = this.canvas.width/3;
    this.radio          = this.w/2*0.8;
    this.radio_interno  = this.radio*0.1;

    this.centro_y   = this.canvas.height/3;
    
    this.centro_x_cpu_01m = this.w/2; 
    this.centro_x_cpu_05m = this.w/2+this.w; 
    this.centro_x_cpu_15m = this.w/2+(this.w*2); 
    
    this.long_indicador   = this.radio * 0.8;
    this.angle_01m        = 2 * Math.PI * (Math.PI /2);
    this.angle_05m        = 2 * Math.PI * (Math.PI /2);
    this.angle_15m        = 2 * Math.PI * (Math.PI /2);
    
    this.w_mem = 0;
    
    this.RequestObject  = '';         

    //this.RequestObject = new XMLHttpRequest();

    this.ArchivoPHP     = '';
    this.xmlhttp        = '';
    
    this.digitalFillStyle   = 'white'; 
    this.digitalFillStyle_0 = 'lightgray';
    this.digitalFillStyle_i = 'red'; 
    this.digitalFont        = '8px sans-serif';
    this.ctx.lineWidth_dflt = 2;


    var instancia = this;
    setInterval(function() {instancia.update();}, this.timer);
  
    this.crearEventos();
    __thisServerStatus = this;
}

ServerStatus.prototype.update = function() {
    
    this.leerSensores(); 
//    this.ajaxGetSensors();
    this.display();
}

ServerStatus.prototype.display = function() {
    this.clear();
    this.updateAngle();
    if (this.analogicoOn)
        this.displayAnalogico();

    if (this.digitalOn)
        this.displayDigital();    

    this.displayTitulos();

}

ServerStatus.prototype.clear = function() {
    this.canvas.width=this.canvas.width;
}

ServerStatus.prototype.setMemTotal = function(v) {
    this.mem_bytes = v;
    this.display();
}

ServerStatus.prototype.setMemUsada = function(v) {
    this.mem_used_bytes = v;
    this.display();
}

ServerStatus.prototype.setCpu01 = function(v) {
    this.cpu_01_min = v;
    this.display();
}

ServerStatus.prototype.setCpu05 = function(v) {
    this.cpu_05_min = v;
    this.display();
}

ServerStatus.prototype.setCpu15 = function(v) {
    this.cpu_15_min = v;
    this.display();
}

ServerStatus.prototype.leerSensores = function() {
        
    // Set sensores random - Pruebas     
    
    this.setCpu01(Math.random()*100);
    this.setCpu05(Math.random()*100);
    this.setCpu15(Math.random()*100);
        
    this.setMemTotal(4000000);
    this.setMemUsada(Math.random()*4000000);
    
    this.display();
}

ServerStatus.prototype.updateAngle = function () {
    this.angle_01m      = 2 * Math.PI * (this.cpu_01_min /100) - (Math.PI /2);
    this.angle_05m      = 2 * Math.PI * (this.cpu_05_min /100) - (Math.PI /2);
    this.angle_15m      = 2 * Math.PI * (this.cpu_15_min /100) - (Math.PI /2);    
}


ServerStatus.prototype.displayTitulos = function () {
    this.ctx.fillStyle = 'green';
    this.ctx.font      = this.digitalFont;
    this.ctx.fillText("CPU %.Servidor (1 / 5 / 15 min.)", 5, this.centro_y*2.1);
    this.ctx.fillText("Uso Mem. (%) Servidor "+Math.round(this.porcentajeUso)+" %",  5, this.centro_y*2.8);
}

ServerStatus.prototype.displayDigital = function() {
    this.ctx.fillStyle = this.digitalFillStyle;
    this.ctx.font      = this.digitalFont;

    this.displayCpuDigital();
    this.displayMemDigital();
}

ServerStatus.prototype.displayCpuDigital = function() {
    this.ctx.fillText(this.cpu_01_min,  5, 0);
    this.ctx.fillText(this.cpu_05_min, 25, 0);
    this.ctx.fillText(this.cpu_15_min, 45, 0);
}

ServerStatus.prototype.displayMemDigital = function() {
    this.ctx.fillText(this.mem_bytes, 65, 0);
}        


ServerStatus.prototype.displayAnalogico = function() {
    this.displayCpuAnalogico();
    this.displayMemAnalogico();
}

ServerStatus.prototype.displayMemAnalogico = function() {
       
    var w_barra         = this.canvas.width/100;
    this.porcentajeUso   = this.mem_used_bytes*100/this.mem_bytes;
            
    for (var i=0; i<=this.porcentajeUso; i++) {
        this.ctx.fillStyle = this.digitalFillStyle_i;
        this.ctx.fillRect(i*w_barra, this.canvas.height*0.75, w_barra*0.9, this.canvas.height*0.25);
        this.ctx.fillStyle = this.digitalFillStyle_0;
        this.ctx.fillRect(i*w_barra, this.canvas.height*0.75, w_barra*0.8, this.canvas.height*0.20);
    }

}

ServerStatus.prototype.displayCpuAnalogico = function() {
    
    this.clear();
    var cpu_01      = new Circle(this.centro_x_cpu_01m, this.centro_y, this.radio, this.digitalFillStyle);
    var cpu_01_0    = new Circle(this.centro_x_cpu_01m, this.centro_y, this.radio*0.90, this.digitalFillStyle_0);
    var cpu_01_i    = new Circle(this.centro_x_cpu_01m, this.centro_y, this.radio_interno, this.digitalFillStyle_i);

    var cpu_02      = new Circle(this.centro_x_cpu_05m, this.centro_y, this.radio, this.digitalFillStyle);
    var cpu_02_0    = new Circle(this.centro_x_cpu_05m, this.centro_y, this.radio*0.90, this.digitalFillStyle_0);
    var cpu_02_i    = new Circle(this.centro_x_cpu_05m, this.centro_y, this.radio_interno, this.digitalFillStyle_i);

    var cpu_03      = new Circle(this.centro_x_cpu_15m, this.centro_y, this.radio, this.digitalFillStyle);
    var cpu_03_0    = new Circle(this.centro_x_cpu_15m, this.centro_y, this.radio*0.90, this.digitalFillStyle_0);
    var cpu_03_i    = new Circle(this.centro_x_cpu_15m, this.centro_y, this.radio_interno, this.digitalFillStyle_i);
          
    cpu_01.draw(this.ctx);
    cpu_01_0.draw(this.ctx);
    cpu_01_i.draw(this.ctx);

    cpu_02.draw(this.ctx);
    cpu_02_0.draw(this.ctx);
    cpu_02_i.draw(this.ctx);

    cpu_03.draw(this.ctx);
    cpu_03_0.draw(this.ctx);
    cpu_03_i.draw(this.ctx);
    
    var Dx = Math.cos(this.angle_01m) * this.long_indicador + this.centro_x_cpu_01m;
    var Dy = Math.sin(this.angle_01m) * this.long_indicador + this.centro_y;  
    this.ctx.lineWidth=this.ctx.lineWidth_dflt;
    this.ctx.strokeStyle=this.digitalFillStyle_i;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centro_x_cpu_01m, this.centro_y);
    this.ctx.lineTo(Dx, Dy);
    this.ctx.stroke();

    var Dx = Math.cos(this.angle_05m) * this.long_indicador + this.centro_x_cpu_05m;
    var Dy = Math.sin(this.angle_05m) * this.long_indicador + this.centro_y;  
    this.ctx.lineWidth=this.ctx.lineWidth_dflt;
    this.ctx.strokeStyle=this.digitalFillStyle_i;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centro_x_cpu_05m, this.centro_y);
    this.ctx.lineTo(Dx, Dy);
    this.ctx.stroke();
    
    var Dx = Math.cos(this.angle_15m) * this.long_indicador + this.centro_x_cpu_15m;
    var Dy = Math.sin(this.angle_15m) * this.long_indicador + this.centro_y;  
    this.ctx.lineWidth=this.ctx.lineWidth_dflt;
    this.ctx.strokeStyle=this.digitalFillStyle_i;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centro_x_cpu_15m, this.centro_y);
    this.ctx.lineTo(Dx, Dy);
    this.ctx.stroke();
    
    this.ctx.closePath();

    this.ctx.fillStyle = 'green';
    this.ctx.font      = '8px sans-serif';
    this.ctx.fillText("0", this.centro_x_cpu_01m-2, this.centro_y-(this.radio*0.60));
    this.ctx.fillText("0", this.centro_x_cpu_05m-2, this.centro_y-(this.radio*0.60));
    this.ctx.fillText("0", this.centro_x_cpu_15m-2, this.centro_y-(this.radio*0.60));

    this.ctx.fillText("50", this.centro_x_cpu_01m-4, this.centro_y+(this.radio*0.80));
    this.ctx.fillText("50", this.centro_x_cpu_05m-4, this.centro_y+(this.radio*0.80));
    this.ctx.fillText("50", this.centro_x_cpu_15m-4, this.centro_y+(this.radio*0.80));

    this.ctx.fillText("75", this.centro_x_cpu_01m-(this.radio*0.80), this.centro_y+4);
    this.ctx.fillText("75", this.centro_x_cpu_05m-(this.radio*0.80), this.centro_y+4);
    this.ctx.fillText("75", this.centro_x_cpu_15m-(this.radio*0.80), this.centro_y+4);

    this.ctx.fillText("25", this.centro_x_cpu_01m+(this.radio*0.50), this.centro_y+4);
    this.ctx.fillText("25", this.centro_x_cpu_05m+(this.radio*0.50), this.centro_y+4);
    this.ctx.fillText("25", this.centro_x_cpu_15m+(this.radio*0.50), this.centro_y+4);
}

ServerStatus.prototype.crearEventos = function() {
        this.canvas.title   = "Click para configurar...";
        this.canvas.onclick =   function () {
                                    var WinSettings = "center:yes;resizable:no;dialogHeight:300px;dialog Width:300px;html:hello"
                                    var titl="<TITLE>Configurar Display</TITLE> ";
                                    var scrst="<scr";
                                    var scrend="ipt>";

                                    var js= scrst + "ipt language=\"javascript\">"
                                            +" function Done() { "
                                            +" var o = new Object();    o.color = idColor.value;"
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
                                            +" <p>Estilo: <select id=\"idFont\">"
                                            +" <option value=\"8px sans-serif\">Sans Serif 8</option>"
                                            +" <option value=\"10px sans-serif\">Sans Serif 10</option>"
                                            +" <option value=\"15px sans-serif\">Sans Serif 15</option>"
                                            +" <option value=\"10px arial\">Arial 10</option>"
                                            +" <option value=\"8px arial\">Arial 8</option>"
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

                                    __thisServerStatus.digitalFillStyle     = oSettings.color;
                                    __thisServerStatus.digitalFont          = oSettings.font;
                                    return false;
                                };
}
// 
ServerStatus.prototype.ajaxGetSensors = function() {
    this.RequestObject = false;
    this.ArchivoPHP = 'setSensores.php';
    this.RequestObject = new XMLHttpRequest();
    __RequestObject = this.RequestObject;
//    if (window.XMLHttpRequest) this.RequestObject = new XMLHttpRequest();
//    if (window.ActiveXObject) this.RequestObject  = new ActiveXObject("Microsoft.XMLHTTP");
    
    this.llamadaAjax();
}

ServerStatus.prototype.ReqChange = function() { 

        if (__RequestObject.readyState==4 && __RequestObject.status ==200) {
                this.mem_used_bytes = __RequestObject.responseText*1;
        } 
    }
ServerStatus.prototype.llamadaAjax = function() {
  
        this.RequestObject.open("GET", this.ArchivoPHP , true);
        this.RequestObject.onreadystatechange = this.ReqChange; 
        this.RequestObject.send(null);
    }
    