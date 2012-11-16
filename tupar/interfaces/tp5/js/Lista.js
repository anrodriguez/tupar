function Lista(){
    this.list = [];
}

Lista.prototype.addElement = function(e) {
    this.list.push(e);
}

Lista.prototype.getLength = function() {
    return(this.list.length);
}

Lista.prototype.getElement = function(i) {
    return(this.list[i]);
}

Lista.prototype.setElement = function(e, i) {
    this.list[i] = e;
}
