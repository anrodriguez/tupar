var archivoCargado=false;
leerArchivoTxt();
var inter;
var map;
var encuesta;
function init(){
    encuesta = new Encuesta(); 
    
    var latlng = new google.maps.LatLng(37.312426384077064, -59.16686199999998);      // Por default set Tandil 37.312426384077064, -59.16686199999998
    var myOptions = {
                     zoom: 5,
                     center: latlng,
                     mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    map = new google.maps.Map(document.getElementById("gmapa"), myOptions);
    setUbicacion();
    setEscala();
    
    document.getElementById("botonCargarDatos").hidden=false;
    document.getElementById("botonCancelarCarga").hidden=true;

  }

function setUbicacion() {
 var ubicacion = document.getElementById("ubicacion").value;   
 var zoomActual = map.getZoom();
 geocoder = new google.maps.Geocoder();
 geocoder.geocode( { 'address': ubicacion}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
       map.setCenter(results[0].geometry.location);
       map.setZoom(zoomActual);
    } else {
       alert("Imposible establecer ubicación - Error:" + status);
      }
    });
}

function setMarcarUbicacion() {
 var ubicacion = document.getElementById("ubicacion").value;   
 geocoder = new google.maps.Geocoder();
 geocoder.geocode( { 'address': ubicacion}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
       map.setCenter(results[0].geometry.location);
       new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: ubicacion
       });
    } else {
       alert("Imposible establecer ubicación - Error:" + status);
      }
    });
}

function changeUbicacion(ubicacion) {
    document.getElementById("ubicacion").value = ubicacion;
    setUbicacion();
    map.setZoom(6);
}

function recargarPagina() {
    document.getElementById("botonCargarDatos").hidden      = false;
    document.getElementById("botonCancelarCarga").hidden    = true;   
    document.getElementById("labelEscala").hidden           = true;
    document.getElementById("escala").hidden                = true;
    location.reload()
}

function setEscala() {
    var escala = document.getElementById("escala").value*1;   
    encuesta.setEscala(escala);
}

function validarEscala() {
    var escala = document.getElementById("escala").value*1;   
    if (escala<1) {
            alert('El valor ingresado en escala no puede ser inferior a 1. Default=2000')
            document.getElementById("escala").value = 2000;   
            return false;
        }

    if (escala>10000) {
            alert('El valor ingresado en escala no puede ser superior a 10000. Default=2000')
            document.getElementById("escala").value = 2000;   
            return false;
        }
    else
        return true;

}