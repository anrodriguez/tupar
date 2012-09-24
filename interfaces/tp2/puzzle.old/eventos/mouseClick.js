function mousedown(e) {
    puzzle.isInside(e.pageX - canvas.offsetLeft,e.pageY - canvas.offsetTop);
    draw();   
}

function mouseup(e) {
    if (puzzle.actual !=    (-1)) {
        puzzle.shapes[puzzle.actual].selected = false;
        puzzle.actual = -1;
        draw();
    }
}

function mousemove(e){
    puzzle.moveTo(e.pageX - canvas.offsetLeft,e.pageY - canvas.offsetTop);
    draw();       
}

function mousedoubleclick(e) {
    puzzle.isInside(e.layerX, e.layerY);
    draw();   
}
