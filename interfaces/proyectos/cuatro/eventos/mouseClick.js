function mousedown(e) {
    cuatro.setFicha(jugador, getMouseX(e), getMouseY(e));
    draw();
    if (jugador==1)
        jugador=2;
    else
        jugador=1;
    
}

function mouseup(e) {
}

function mousemove(e){
}

function mousedoubleclick(e) {
}

function getMouseX(e) {
    return e.pageX - canvas.offsetLeft;
}

function getMouseY(e) {
    return e.pageY - canvas.offsetTop;
}