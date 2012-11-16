var registro = [];
function leerArchivoTxt() {
    var datos = new XMLHttpRequest();       

    var archivo = [];
    
    datos.open('GET', 'datos/datos.txt');
    datos.onreadystatechange = function() {
        archivo = datos.responseText;
        registro = archivo.split(/\r\n|\n/);
    }
    datos.send();
}

function trim (myString) {
    return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}

function leerEncuesta(encuesta) {
    if (archivoCargado)
        return;
    
    if (document.getElementById("nameCandidatoA").value=='n/a')
        document.getElementById("nameCandidatoA").value = 'Candidato A';
    if (document.getElementById("nameCandidatoB").value=='n/a')
        document.getElementById("nameCandidatoB").value = 'Candidato B';

    var inputNombreCandidatoA   = trim(document.getElementById("nameCandidatoA").value);
    var inputNombreCandidatoB   = trim(document.getElementById("nameCandidatoB").value);
    var colorCandidatoA         = document.getElementById("colorCandidatoA").value;
    var colorCandidatoB         = document.getElementById("colorCandidatoB").value;

    var campo       = registro[0].split(/\;/);
    
    var candidatoA  = new Candidato(trim(inputNombreCandidatoA), colorCandidatoA);
    var candidatoB  = new Candidato(trim(inputNombreCandidatoB), colorCandidatoB);

    var candidatoANombre = candidatoA.getNombre();
    var candidatoBNombre = candidatoB.getNombre();

    var selectEncuesta = '<select id="listaSelect" onclick="changeUbicacion(this.value)">';

    for (var i=1; i<registro.length; i++) {
        campo = registro[i].split(/\;/);
        var localidad   = trim(campo[0]);
        var provincia   = trim(campo[1]);
        var votosCandidatoA  = trim(campo[2]);
        var votosCandidatoB  = trim(campo[3]);
        ciudad      = new Ciudad(localidad, provincia);
        voto        = new Voto(ciudad, candidatoA, votosCandidatoA);
        ciudad.addVotos(voto);
        var ciudadNombre    = ciudad.getNombreCompleto();
        selectEncuesta = selectEncuesta+'<option value="'+ciudadNombre+'">'+ciudadNombre+' - '+candidatoANombre+' = '+votosCandidatoA+'</option>';        
        encuesta.addElement(voto);
        voto        = new Voto(ciudad, candidatoB, votosCandidatoB);
        ciudad.addVotos(voto);
        encuesta.addElement(voto);
        selectEncuesta = selectEncuesta+'<option value="'+ciudadNombre+'">'+ciudadNombre+' - '+candidatoBNombre+' = '+votosCandidatoB+'</option>';        

    }
        selectEncuesta = selectEncuesta+['</select>'];        
        var span = document.createElement('span');
        span.innerHTML = selectEncuesta;
        document.getElementById('list').insertBefore(span, null);

        archivoCargado = true;
}

function cargarDatos(encuesta) {
    leerEncuesta(encuesta);
    setUbicacion();
    setEscala();
    inter = setInterval(function() {encuesta.displayNext(map);}, 1000);
    document.getElementById("botonCargarDatos").hidden      = true;
    document.getElementById("botonCancelarCarga").hidden    = false;
    document.getElementById("colorCandidatoA").hidden       = true;
    document.getElementById("colorCandidatoB").hidden       = true;
    document.getElementById("nameCandidatoA").hidden        = true;
    document.getElementById("nameCandidatoB").hidden        = true;
    document.getElementById("labelEscala").hidden           = true;
    document.getElementById("escala").hidden                = true;
    document.getElementById("listaSelect").hidden           = false;

    if (document.getElementById("nameCandidatoA").value!='')
        document.getElementById("labelCandidatoA").textContent=document.getElementById("nameCandidatoA").value;
    if (document.getElementById("nameCandidatoB").value!='')
    document.getElementById("labelCandidatoB").textContent=document.getElementById("nameCandidatoB").value;
}

function cancelarCarga(){
    window.clearInterval(inter);
    document.getElementById("botonCargarDatos").hidden      = false;
    document.getElementById("botonCancelarCarga").hidden    = true;
    document.getElementById("colorCandidatoA").hidden       = false;
    document.getElementById("colorCandidatoB").hidden       = false;
    document.getElementById("nameCandidatoA").hidden        = false;
    document.getElementById("nameCandidatoB").hidden        = false;
    document.getElementById("labelEscala").hidden           = false;
    document.getElementById("escala").hidden                = false;
    document.getElementById("listaSelect").hidden           = true;
}   