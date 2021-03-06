var canvas;
var ctx;

var time    = null;
var dt      = 50;
var timer   = 0;
var estado  = 0;
var inter;

var timer2   = 0;
var estado2  = 0;

var onTimer   = false;

var rd=0;
var gd=0;
var bd=0;
var r=0;
var g=0;
var b=0;

function reloj() {
    canvas      = document.getElementById("widget0");
    ctx         = canvas.getContext("2d");

    var now         = new Date();
    var hora        = now.getHours();
    var minutos     = now.getMinutes();
    var segundos    = now.getSeconds();
    var angleHH     = 2 * Math.PI * (hora /60) - (Math.PI /2);
    var angleMM     = 2 * Math.PI * (minutos /60) - (Math.PI /2);
    var angleSS     = 2 * Math.PI * (segundos /60) - (Math.PI /2);

    if (minutos<10)
        minutos='0'+minutos;
    if (segundos<10)
        segundos='0'+segundos;
    
    var centro_x    = canvas.width /2;
    var centro_y    = canvas.height /2;
    
    var lonHH       = (canvas.width/2) - 50;
    var lonMM       = (canvas.width/2) - 30;
    var lonSS       = (canvas.width/2) - 10;

    canvas.width=canvas.width;

    var circulo = new Circle(centro_x, centro_y, 95, 'lightgray');
    var marcas  = new List();
    marcas.agregar(new Box(5, (canvas.width/2)-5, 5, 5, 'blue'));
    marcas.agregar(new Box((canvas.width/2), 5, 5, 5, 'blue'));
    marcas.agregar(new Box((canvas.width/2), 5, 5, 5, 'blue'));
    
    circulo.draw(ctx);
    marcas.draw(ctx);
    
    var Dx = Math.cos(angleSS) * lonSS + centro_x;
    var Dy = Math.sin(angleSS) * lonSS + centro_y;
   
    ctx.lineWidth=1;
    ctx.strokeStyle="red";
    ctx.beginPath();
    ctx.moveTo(centro_x, centro_y);
    ctx.lineTo(Dx, Dy);
    ctx.stroke();
    
    Dx = Math.cos(angleMM) * lonMM + centro_x;
    Dy = Math.sin(angleMM) * lonMM + centro_y;
    ctx.lineWidth=4;
    ctx.strokeStyle="black";
    ctx.beginPath();
    ctx.moveTo(centro_x, centro_y);
    ctx.lineTo(Dx, Dy);
    ctx.stroke();

    Dx = Math.cos(angleHH) * lonHH + centro_x;
    Dy = Math.sin(angleHH) * lonHH + centro_y;
    ctx.strokeStyle="green";
    ctx.lineWidth=4;
    ctx.beginPath();
    ctx.moveTo(centro_x, centro_y);
    ctx.lineTo(Dx, Dy);    
    ctx.stroke();    
}
