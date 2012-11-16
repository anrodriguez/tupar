var radio = null;
var color = null;

function Encuesta() {
 this.encuesta  = new Lista();
 this.cursor    = 0;
 this.escala    = 1;
}

Encuesta.prototype.addElement = function(voto) {
    this.encuesta.addElement(voto);
}

Encuesta.prototype.getElement = function(i) {
    return this.encuesta.getElement(i);
}

Encuesta.prototype.setAllPointsMap = function(map) {
        
    for (var i=0; i<this.encuesta.getLength(); i++) {
        this.setPointsMap(map, i);
  }
}

Encuesta.prototype.displayNext = function(map) {
    if (this.cursor==0) {
        var rta = confirm ("A continuación se van a cargar todos los puntos en el mapa. El proceso demorará unos segundos. ¿Desea continuar?")
        if (!rta) {
            alert ("Sin datos. Imposible visualizar encuesta. El proceso se reintentará en 10 seg.");        
            window.clearInterval(inter);
            inter = setInterval(function() {encuesta.displayNext(map);}, 10000);
            return;
        }
        alert('A continuación se van a cargar todos los puntos en el mapa. Por favor, cierre esta ventana y aguarde un momento hasta que finalize el proceso...');
        map.setZoom(8); 
    }
    if (this.cursor<this.encuesta.getLength()) {
        this.setPointsMap(map, this.cursor++);  
    }
    else {
        map.setZoom(5); 
        window.clearInterval(inter); alert('Se ha finalizado la carga de los puntos en el mapa.');
        document.getElementById("botonCargarDatos").hidden      = true;
        document.getElementById("botonCancelarCarga").hidden    = true;
        document.getElementById("labelEscala").hidden           = true;
        document.getElementById("escala").hidden                = true;
    }
    if(this.cursor==1) {
        window.clearInterval(inter);
        inter = setInterval(function() {encuesta.displayNext(map);}, 1000);
    }
}

Encuesta.prototype.setEscala = function(escala) {
    this.escala = escala;
}

Encuesta.prototype.getEscala = function() {
    return this.escala;
}

Encuesta.prototype.setCursor = function(cursor) {
    this.cursor = cursor;
}

Encuesta.prototype.getCursor = function() {
    return this.cursor;
}

Encuesta.prototype.avanzarCursor = function() {
    this.cursor++;
}

Encuesta.prototype.getTotalVotos = function() {
    var totalVotos = 0;
    for (var i=0; i<this.encuesta.getLength(); i++) {
        totalVotos = totalVotos+this.encuesta.getElement(i).getVotos();
    }
    return totalVotos;
}

Encuesta.prototype.setPointsMap = function(map, i) {
    geocoder = new google.maps.Geocoder();
    totalVotos = this.getTotalVotos();
        
    ciudad          = this.encuesta.getElement(i).getCiudad();
    candidato       = this.encuesta.getElement(i).getCandidato();
    ciudadNombre    = ciudad.getNombreCompleto();
    candidatoNombre = candidato.getNombre();
    color           = candidato.getColor();
    votos           = this.encuesta.getElement(i).getVotos();
    radio           = (votos*100/totalVotos)*this.escala;
    geocoder.geocode( { 'address': ciudadNombre}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
             var populationOptions = {
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: color,
                fillOpacity: 0.35,
                map: map,
                center: results[0].geometry.location, 
                radius: radio
              };
              cityCircle = new google.maps.Circle(populationOptions);
              ciudad.setLocation(cityCircle.getCenter());
              var marker = ciudad.setMarkerMap(map);
        } else {
            if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
                alert('Imposible cargar: '+ciudadNombre);
                this.sleep(3000);
            }
            else {
                alert("Imposible establecer ubicación - Error:" + status);
            }
        }
    });
}

Encuesta.prototype.sleep = function(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
} 

