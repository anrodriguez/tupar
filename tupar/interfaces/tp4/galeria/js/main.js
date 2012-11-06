var canvas;
var ctx;

var img;
var img_default = './img/00.jpg';

function init() {
    canvas      = document.getElementById("canvas");
    ctx         = canvas.getContext("2d");
  
    img     = new Image();
    img.src = img_default;  

    img.onload = function() {
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    }           
    return; 
}
