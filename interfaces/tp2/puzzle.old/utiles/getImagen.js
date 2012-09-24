function getImagen(canvas, contexto) {
    return contexto.getImageData(0,0,canvas.width, canvas.height);
}