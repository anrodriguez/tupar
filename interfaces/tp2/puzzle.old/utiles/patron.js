function patron(x, y, w, h) {
    
    var patron =0;
    var type = repeat = Math.floor(Math.random()*4);
    var c    = rgb(Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255));
    var c1    = rgb(Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255));
    
    switch (type) {
        case 0:
            patron = c;
            break;
            
        case 1:
            patron=ctx.createLinearGradient(x, x, y, y);
            patron.addColorStop(0, c);
            patron.addColorStop(1, c1);
            break;
            
        case 2:
            patron=ctx.createRadialGradient(x, y, 20, x, y, 30);
            patron.addColorStop(0, c);
            patron.addColorStop(1, c1);
            break;

        case 3:
            var img = new Image();
            img.src='./canvas.jpg';
            
            switch(repeat) {
                case 0: 
                    patron=ctx.createPattern(img, "repeat-no");
                    break;
                case 1: 
                    patron=ctx.createPattern(img, "repeat");
                    break;
                case 2: 
                    patron=ctx.createPattern(img, "repeat-x");
                    break;
                case 3: 
                    patron=ctx.createPattern(img, "repeat-y");
                    break;
        }
            break;
    }
        
    return patron;
}
