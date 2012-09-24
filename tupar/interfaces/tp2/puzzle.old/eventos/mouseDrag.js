function mousedown(e) {
    
    puzzle.setDesde(getMouseX(e), getMouseY(e));
    puzzle.setTope(puzzle.getDesde());
    puzzle.savePosShape(puzzle.getDesde());
}

function mouseup(e) {

    var x = getMouseX(e);
    var y = getMouseY(e);
        
    puzzle.setTope(-1);
    puzzle.restorePosShape(puzzle.getDesde());
    puzzle.setHasta(x, y);
    var resultado = puzzle.jugar();
    draw();
    if (resultado)
        alert('Felicitaciones!!');

}

function mousemove(e){
    
    
    puzzle.moveTo(getMouseX(e), getMouseY(e)); //e.pageX - canvas.offsetLeft,e.pageY - canvas.offsetTop);
    draw();      /*
 
     var x;
    var y;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    }
    else { 
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    } 

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    puzzle.moveTo(x, y);
 
    draw();
   */ 
    
}

function mousedoubleclick(e) {
}

function getMouseX(e) {
    var x;
    if (e.pageX)
        x = e.pageX;
    else
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
    
    return (x - canvas.offsetLeft);
}

function getMouseY(e) {
    var y;
    if (e.pageY)
        y = e.pageY;
    else
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 

    return (y - canvas.offsetTop);
}