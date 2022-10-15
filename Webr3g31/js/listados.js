listarcategoriasDinamica()
listarclientes()
listarjuegos()

function listarcategorias(){
    let codigoCategoria = document.getElementById("categorias").value
    let datos = document.getElementById("datos")

    datos.innerHTML = "Has seleccionado la Categoria con id :" + codigoCategoria
    
} 

function listarcategoriasDinamica(){
    let url="http://129.146.131.247:8083/api/Category/all"
    let categoriasDin =  document.getElementById("categoriasDin")

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);
            let opciones = ""
            /*console.log("Primero en formato texto: " + this.responseText)
            console.log("Ahora como json" + respuesta)*/

            console.log(respuesta)
            for(let i in respuesta){
                console.log(respuesta[i].id)
                console.log(respuesta[i].name)
                opciones += '<option value="' +  respuesta[i].id + '">' + respuesta[i].name +'</option>'
            }

            categoriasDin.innerHTML = opciones


        }
    };
    xhttp.open("GET",url,true)
    xhttp.send()

} 

function listarjuegos(){
    let url="http://129.146.131.247:8083/api/Game/all"
    let juegosDin =  document.getElementById("juegosDin")

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);
            let opciones = ""

            console.log(respuesta)
            for(let i in respuesta){
                console.log(respuesta[i].id)
                console.log(respuesta[i].name)
                console.log(respuesta[i].year)
                opciones += '<option value="' +  respuesta[i].id + '">' + respuesta[i].name + ' -- '+ respuesta[i].year + '</option>'
            }

            juegosDin.innerHTML = opciones


        }
    };
    xhttp.open("GET",url,true)
    xhttp.send()

} 

function listarclientes(){
    let url="http://129.146.131.247:8083/api/Client/all"
    let clientesDin =  document.getElementById("clientesDin")

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);
            let opciones = ""

            console.log(respuesta)
            for(let i in respuesta){
                console.log(respuesta[i].idClient)
                console.log(respuesta[i].name)
                opciones += '<option value="' +  respuesta[i].idClient + '">' + respuesta[i].name +'</option>'
            }

            clientesDin.innerHTML = opciones


        }
    };
    xhttp.open("GET",url,true)
    xhttp.send()

} 

function categoriaseleccionada(){
    alert("Selecciono el id de categoria: " + document.getElementById("categoriasDin").value)
}

function clienteseleccionado(){
    alert("Selecciono el id de cliente: " + document.getElementById("clientesDin").value)
}

function juegoseleccionado(){
    alert("Selecciono el id de juego: " + document.getElementById("juegosDin").value)
}