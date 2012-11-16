function Ciudad(nombre, provincia) {
    this.nombre          = nombre;
    this.provincia       = provincia;
    this.location        = null;
    
    this.votos           = new Lista();
    this.animation       = true;
}

Ciudad.prototype.getNombreCompleto = function() {
    var point = this.nombre;
    if (this.provincia!='')
            point+=', '+this.provincia;
    return point;
}

Ciudad.prototype.setLocation = function(location) {
    this.location = location;
}

Ciudad.prototype.getLocation = function() {
    return this.location;
}

Ciudad.prototype.addVotos = function(voto) {
    this.votos.addElement(voto);
}

Ciudad.prototype.setMarkerMap = function(map) {
    var v   = '';
    var a   = '';
    
    for (var i=0; i<this.votos.getLength(); i++) {
        v = v + '   '+this.votos.getElement(i).candidato.getNombre()+' '+this.votos.getElement(i).getVotos()+'\n';
    }
    if (this.animation) {
        this.animation = false;
        a = google.maps.Animation.DROP;
        }
    else
        {
        this.animation = true;
        a = '';
        }
        
    var marker = new google.maps.Marker({
        map: map,
        position: this.location,
        visible: true,
        animation: a,
        title: this.getNombreCompleto()+'\n'+v
    });
}
