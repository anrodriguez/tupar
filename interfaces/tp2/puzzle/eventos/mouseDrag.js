function mousedown(e) {
    puzzle.setDesde(getMouseX(e), getMouseY(e));
}

function mouseup(e) {
    puzzle.setHasta(getMouseX(e), getMouseY(e));
    var resultado = puzzle.jugar();
    draw();
    if (resultado)
        alert('Felicitaciones!!');
}

function mousemove(e){
    puzzle.moveTo(getMouseX(e), getMouseY(e)); 
    draw();
}

function mousedoubleclick(e) {
}

function getMouseX(e) {
    return e.pageX - canvas.offsetLeft;
}

function getMouseY(e) {
    return e.pageY - canvas.offsetTop;
}