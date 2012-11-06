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

function setClassName(cName) {
   document.getElementById("canvas").className=cName;    
}
