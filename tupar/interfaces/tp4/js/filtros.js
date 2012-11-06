/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var brillo = 0;

function setOriginal(){
    setClassName("original");
}

function setBlur(){
    setClassName("blur");
}

function setGris(){
    setClassName("gris");
}

function setSepia(){
    setClassName("sepia");
}

function setBrillo(){
    setClassName("brillo");
}

function setFlip(){
    setClassName("flip");
}

function setSombra(){
    setClassName("sombra");
}

function setClassName(cName) {
   document.getElementById("imgModificada").className=cName;    
}

