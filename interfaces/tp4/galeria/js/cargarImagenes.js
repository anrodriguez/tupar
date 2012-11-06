  function handleFileSelect(evt) {
    var files = evt.target.files; 
    for(var i=0, f ;f=files[i]; i++) {
        if (!f.type.match('image.*'))
            return;

        var reader = new FileReader();

        reader.onload = ( function(theFile) {
                                return function(e) {
                                            var span = document.createElement('span');
                                            span.innerHTML = ['<img class="img" src="', e.target.result,
                                                            '" onmouseover="selectImagen(',"'",escape(theFile.name),"'",
                                                            "",')" ',
                                                            //'id="',escape(theFile.name),
                                                            'id="',"img1",
                                                            '" title="', escape(theFile.name), '"/>'].join('');
                                            document.getElementById('list').insertBefore(span, null);
                                        };
                           })(f);
    
        reader.readAsDataURL(f);
    }
}

document.getElementById('archivo').addEventListener('change', handleFileSelect, false);

function selectImagen(id) {
    img.src         = document.getElementById(id).src;
    canvasPrincipal = img.src;
    cambiarTransicion();
  }
  
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}  

function cambiarTransicion(){

    //var lastSheet = document.styleSheets[document.styleSheets.length-1];

    var e = document.getElementById("img1");
    e.style.webkitAnimationName = "webkit-t3";
    e.style.webkitAnimationDuration = "60s";
    e.style.webkitAnimationIterationCount = "infinite";
    e.style.webkitAnimationTimingFunction = "linear";
}
