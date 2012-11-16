function setColor(id, color) {
    if (validarColor()) {
        setClassName(id, color);
    }
}

function setClassName(id, cName) {
   document.getElementById(id).className=cName;    
}

function validarColor(){
    colorA = document.getElementById('colorCandidatoA').value;
    colorB = document.getElementById('colorCandidatoB').value;
    if (colorA==colorB) {
        alert('Imposible asignar el mismo color para ambos candidatos.');
        return false;
    }
     else {
         return true;
    }        
}
