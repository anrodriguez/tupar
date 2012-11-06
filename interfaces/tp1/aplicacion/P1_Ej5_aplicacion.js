
// Eventos----------------------------------------------------------------------

function eClearCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    eHistograma();
}

function eNegativo(){
    document.getElementById("filtroAplicado").value = "Negativo";
    imgData = negativo(getImagen(canvasOriginal, ctxOriginal)); 
    refreshCanvasTrabajo(imgData);
}
function eBrillo(){
    brilloActual = parseInt(document.getElementById("brilloActual").value);
    document.getElementById("filtroAplicado").value = "Brillo actual: "+brilloActual;

    var imgData = getImagen(canvasOriginal, ctxOriginal);
    imgData = brillo(imgData, brilloActual);
    refreshCanvasTrabajo(imgData);
}
function eAumentarBrillo(){   
    brilloActual = parseInt(document.getElementById("brilloActual").value) + parseInt(document.getElementById("factorBrillo").value);
    document.getElementById("brilloActual").value = brilloActual;   
    document.getElementById("filtroAplicado").value = "Brillo actual: "+brilloActual;
    
    var imgData = getImagen(canvasOriginal, ctxOriginal);
    imgData = brillo(imgData, brilloActual);
    refreshCanvasTrabajo(imgData);
}

function eDisminuirBrillo(){
    brilloActual = parseInt(document.getElementById("brilloActual").value) - parseInt(document.getElementById("factorBrillo").value);
    document.getElementById("brilloActual").value = brilloActual;
    document.getElementById("filtroAplicado").value = "Brillo actual: "+brilloActual;
    
    var imgData = getImagen(canvasOriginal, ctxOriginal);
    imgData = brillo(imgData, brilloActual);
    refreshCanvasTrabajo(imgData);
}

function eBinarizacion(){
    document.getElementById("filtroAplicado").value = "Binarización";
    factor = document.getElementById("factorBin").value;   
    if (factor=='')
        factor=128;
    
    var imgData = getImagen(canvasOriginal, ctxOriginal);
    imgData = binarizacion(imgData, factor);
    refreshCanvasTrabajo(imgData);
}

function eGrises() {
    document.getElementById("filtroAplicado").value = "Escala de grises";
    var imgData = getImagen(canvasOriginal, ctxOriginal);
    imgData = grises(imgData);
    refreshCanvasTrabajo(imgData);
}

function eSepia() {
    document.getElementById("filtroAplicado").value = "Sepia";
    var imgData = getImagen(canvasOriginal, ctxOriginal);
    imgData = sepia(imgData);
    refreshCanvasTrabajo(imgData);
}

function eCopiarImagenOriginal(){
    var imgData = getImagen(canvasOriginal, ctxOriginal);
    refreshCanvasTrabajo(imgData);
    document.getElementById("brilloActual").value = 0;       
    document.getElementById("filtroAplicado").value = "Original. Sin filtros";
}

function eHistograma() {
    var imgData = getImagen(canvasTrabajo, ctxTrabajo)
    
    var arrRed   = new Array();
    var arrGreen = new Array();
    var arrBlue  = new Array();
    
    for (i=0; i<256; i++) {
        arrRed[i] = arrGreen[i] = arrBlue[i] = 0;
    }
        
    for (var i=0;i<imgData.width*imgData.height*4;i+=4) {
        arrRed[imgData.data[i]]++;
        arrGreen[imgData.data[i+1]]++;
        arrBlue[imgData.data[i+2]]++;  
    }

    maxR = maxValue(arrRed);
    maxG = maxValue(arrGreen);
    maxB = maxValue(arrBlue);

    ctxHistograma.fillStyle = "white";
    ctxHistograma.fillRect(0, 0, canvasHistograma.width, canvasHistograma.height);
    
    var altoHistograma = canvasHistograma.height/3;

    ctxHistograma.fillStyle = "black";
    ctxHistograma.fillRect(20, 0, 256, canvasHistograma.height);
    ctxHistograma.fillStyle = "white";
    ctxHistograma.fillRect(21, 0, 255, canvasHistograma.height-1);
        
    for(i=0; i<256; i++) {
        ctxHistograma.fillStyle = "red";
        ctxHistograma.fillRect(i+20, altoHistograma-(arrRed[i]/maxR*altoHistograma), 1, arrRed[i]/maxR*altoHistograma);
        ctxHistograma.fillStyle = "green";
        ctxHistograma.fillRect(i+20, altoHistograma*2-(arrGreen[i]/maxG)*altoHistograma, 1, (arrGreen[i]/maxG)*altoHistograma);
        ctxHistograma.fillStyle = "blue";
        ctxHistograma.fillRect(i+20, (altoHistograma*3)-(arrBlue[i]/maxB)*altoHistograma, 1, (arrBlue[i]/maxB)*altoHistograma);
    }
    
}

function maxValue(arr) {
    var max = arr[0];
    
    for(i=0; i<arr.length; i++)
        if (arr[i]>max)
            max = arr[i];
    
    return max;
}


//-----------------------------------------------------------------------------
function eExaminar() {
    src.value = './imagenes/'+document.getElementById("examinarBoton").value.replace(/^C:\\fakepath\\/i, '');
    eCargarImagen();
}

function eCargarImagen() {
    eClearCanvas(canvasOriginal);
    imagenOriginal.src = src.value;
}


// ----------------------------------------------------------------------------
// Filtros  

function negativo(imagen) {
    imgData = imagen;
    for (var i=0;i<imgData.width*imgData.height*4;i+=4) {
        imgData.data[i]     = 255-imgData.data[i];
        imgData.data[i+1]   = 255-imgData.data[i+1];
        imgData.data[i+2]   = 255-imgData.data[i+2];
        imgData.data[i+3]   = 255;
    }
    return imgData;
}
    
function brillo(imagen, ajuste){
    if (ajuste==''||ajuste==null)
        ajuste=0;
    var imgData = imagen;
    for (var i=0;i<imgData.width*imgData.height*4;i+=4) {
            
        ajustarColor(imgData.data[i]     += ajuste);
        ajustarColor(imgData.data[i+1]   += ajuste);
        ajustarColor(imgData.data[i+2]   += ajuste);
        ajustarColor(imgData.data[i+3]   += ajuste);
    }
    return imgData;
}

function binarizacion(imgData, factor) {
    for (i=0; i<imgData.width; i++)
        for (j=0; j<imgData.height; j++) {
            var gris = (getRed(imgData, i, j) + getGreen(imgData, i, j) + getBlue(imgData, i, j))/3;

            if (gris<factor)
                setPixel(imgData, i, j, 255, 255, 255, 255);
            else
                setPixel(imgData, i, j, 0, 0, 0, 255);
        }
    return imgData;
}

function grises(imagen) {
    for (i=0; i<imagen.width; i++)
        for (j=0; j<imagen.height; j++) {
            var gris = (getRed(imagen, i, j) + getGreen(imagen, i, j) + getBlue(imagen, i, j))/3;
            setPixel(imagen, i, j, gris, gris, gris, 255);
        }
    return imagen;
}

function sepia(imgData) {
    for (i=0; i<imgData.width; i++)
        for (j=0; j<imgData.height; j++) {
            
            var r = getRed(imgData, i, j);
            var g = getGreen(imgData, i, j);
            var b = getBlue(imgData, i, j);
            
            var red   = r*0.393+g*0.769+b*0.189;
            var green = r*0.393+g*0.686+b*0.168;
            var blue  = r*0.272+g*0.534+b*0.131;
            
            setPixel(imgData, i, j, red, green, blue, 255);
        }
    return imgData;
    
}

// ----------------------------------------------------------------------------
// Funciones
        
function getRed(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index+0];
}
    
function getGreen(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index+1];
}
    
function getBlue(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index+2];
}
    
function getA(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index+3];
}
    
function setPixel(imageData, x, y, r, g, b, a) { 
    index = (x + y * imageData.width) * 4;

    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}
    
function getImagen(canvas, contexto) {
    return contexto.getImageData(0,0,canvas.width, canvas.height);
}


function ajustarColor(pixel) {
    if (pixel<0)
        pixel=0;
    if (pixel>255)
        pixel=255;

    return pixel;
}

function refreshCanvasTrabajo(imgData) {
    ctxTrabajo.putImageData(imgData, 0,0);    
    eHistograma();
}