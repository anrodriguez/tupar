function Voto(ciudad, candidato, votos) {
    this.ciudad     = ciudad;
    this.candidato  = candidato;
    this.votos      = votos;
}

Voto.prototype.getCiudad = function() {
    return this.ciudad;
}

Voto.prototype.getCandidato = function() {
    return this.candidato;
}

Voto.prototype.getVotos = function() {
    return this.votos*1;
}

