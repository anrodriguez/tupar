function rgb(r, g, b) {
    var decColor = r+256*g+65536*b;
    return '#'+decColor.toString(16);
}  
