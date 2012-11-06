/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function init(){
var hora = new Date();

var lastSheet = document.styleSheets[document.styleSheets.length-1];

//var degOffset = hora.getSeconds() * 60 /360;
var degOffset = 2 * Math.PI * (hora.getSeconds() /60) - (Math.PI /2);

var e = document.getElementById("segundos");

e.style.webkitAnimationName = "webkit-anim-segundos";
e.style.webkitAnimationDuration = "60s";
e.style.webkitAnimationIterationCount = "infinite";
e.style.webkitAnimationTimingFunction = "linear";

lastSheet.insertRule("@-webkit-keyframes webkit-anim-segundos {"+
                        "from    {-webkit-transform: rotate("+degOffset+"deg);}"+
                        "to      {-webkit-transform: rotate("+360.0+degOffset*1.0+"deg);}}" 
                    );              
}
