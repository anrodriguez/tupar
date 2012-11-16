function Candidato(nombre, color) {
    this.nombre          = nombre;
    this.fillColor       = color;
}

Candidato.prototype.getNombre = function() {
    return this.nombre;
}

Candidato.prototype.getColor = function() {
    return this.fillColor;
}
