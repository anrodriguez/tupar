  function handleFileSelect(evt) {
    var files = evt.target.files; 
    for(var i=0, f ;f=files[i]; i++) {
        if (!f.type.match('image.*'))
            return;

        var reader = new FileReader();

        reader.onload = ( function(theFile) {
                                return function(e) {
                                            var span = document.createElement('span');
                                            span.innerHTML = ['<img src="', e.target.result,
                                                              selectTransicion(),
                                                              ' onclick="selectImagen(',"'",escape(theFile.name),"'","",')" ',
                                                            'id="',escape(theFile.name),
                                                            '" title="', escape(theFile.name), '"/>'].join('');
                                            document.getElementById('list').insertBefore(span, null);
                                        };
                           })(f);
    
        reader.readAsDataURL(f);
    }
}

document.getElementById('archivo').addEventListener('change', handleFileSelect, false);

function selectImagen(id) {
    document.getElementById("list").className="img1";
    img.src         = document.getElementById(id).src;
    canvasPrincipal = img.src;
  }
  
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}  

function selectTransicion(){
    return('"class="img"');
}
