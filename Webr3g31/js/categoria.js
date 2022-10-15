let url ="http://129.146.131.247:8083/api/Category/all";
let nuevo = document.getElementById("nuevo");
let modificar = document.getElementById("modificar");
let borrar = document.getElementById("borrar");
let datos = document.getElementById("datos");

inicial()
traerdatos();

function inicial() {
  nuevo.style.display = "none";
  modificar.style.display = "none";
  borrar.style.display = "none";
  datos.style.display = "block";
}

function agregar() {

  document.getElementById("name").value=""
  document.getElementById("description").value=""
  
  nuevo.style.display = "block";
  modificar.style.display = "none";
  borrar.style.display = "none";
  datos.style.display = "none";

  document.getElementById("name").focus()
}

function editar(id) {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();localhost
  url ="http://129.146.131.247:8083/api/Category";
  
  /*
  2 propiedad onreadystatechange asigna a una funcion
  que funcion valida si la respuesta fue exitosa
  readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
  le aplica formato y modifica la pagina o vista
*/
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let respuesta = JSON.parse(this.responseText)
      console.log(respuesta);

      let idModif = respuesta.id
      let nameModif = respuesta.name
      let descriptionModif = respuesta.description

      document.getElementById("idModif").value = idModif
      document.getElementById("nameModif").value = nameModif
      document.getElementById("descriptionModif").value = descriptionModif

      //modificamos el titulo para que muestre el valor del codigo de la finca
      document.getElementById("idLabel").innerHTML = "<strong>Id :</strong>" + idModif

      nuevo.style.display = "none";
      modificar.style.display = "block";
      borrar.style.display = "none";
      datos.style.display = "none";
    }
  };
  peticion.open("GET", url + "/" + id, true);
  peticion.send();

}

function eliminar(id) {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url = "http://129.146.131.247:8083/api/Category";

  /*
  2 propiedad onreadystatechange asigna a una funcion
  que funcion valida si la respuesta fue exitosa
  readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
  le aplica formato y modifica la pagina o vista
*/
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let respuesta = JSON.parse(this.responseText)

      let idList = respuesta.id
      let nameList = respuesta.name
      let descriptionList = respuesta.description

      
      document.getElementById("idDelete").value = idList
      document.getElementById("idList").innerHTML = "<strong>Id :</strong>" + idList
      document.getElementById("nameList").innerHTML = "<strong>Nombre :</strong>" + nameList
      document.getElementById("descriptionList").innerHTML = "<strong>Descripción :</strong>" + descriptionList
      nuevo.style.display = "none";
      modificar.style.display = "none";
      borrar.style.display = "block";
      datos.style.display = "none";
    }
  };
  peticion.open("GET", url + "/" + id, true);
  peticion.send();
}

function guardarNuevo() {

  //recuperar la informacion ingresada en el formulario
  
  let nameCategory = document.getElementById("name").value
  let descriptionCategory = document.getElementById("description").value
  
  //creo un objeto javascript
  let objeto = {
    name: nameCategory,
    description: descriptionCategory
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)

  url = "http://129.146.131.247:8083/api/Category/save";         

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest()

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {

      //Configura el aspecto de la pagina
      traerdatos()
      inicial()
    }
  }

  peticion.open("POST", url, true)
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  peticion.send(objetoJson)
}

function guardarEditar() {

  //recuperar la informacion ingresada en el formulario
  let idFarm = document.getElementById("idModif").value
  let nameModif = document.getElementById("nameModif").value
  let descriptionModif = document.getElementById("descriptionModif").value

  //creo un objeto javascript
  let objeto = {
    id: idFarm,
    name: nameModif,
    description: descriptionModif
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)
  url ="129.146.131.247:8083/api/Category/update";

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest()

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {

      //Configura el aspecto de la pagina
      traerdatos()
      inicial()
    }
  }

  peticion.open("PUT", url, true)
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  peticion.send(objetoJson)
}

function guardarBorrar() {
  //recuperar la informacion ingresada en el formulario
  let idDelete = document.getElementById("idDelete").value

  //creo un objeto javascript
  /*
  let objeto = {
    id: idDelete
  }
  */
  //convierto el objeto de javascript a formato json
  //let objetoJson = JSON.stringify(objeto)

  let url = "129.146.131.247:8083/api/Category/delete";

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest()

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 204) {

      //Configura el aspecto de la pagina
      traerdatos()
      inicial()
    }
  }

  peticion.open("DELETE", url + "/" + idDelete, true)
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  peticion.send(objetoJson)
}

function traerdatos() {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url ="http://129.146.131.247:8083/api/Category/all";
  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    //almacena el html para generar los registros de la tabla
    let registros = "";
    //valida si la peticion fue exitosa
    if (this.readyState == 4 && this.status == 200) {
      let respuesta = JSON.parse(this.responseText);
      //crear html usando los datos de la respuesta que me da el servicio
      //variable 'respuesta'
      for (let i in respuesta) {
        let id = respuesta[i].id;
        registros +=
          '<tr>\
            <th scope="row">' +
                respuesta[i].id +
           "</th>\
            <td>" +
                respuesta[i].name +
            "</td>\
             <td>" +
                respuesta[i].description +
            "</td>" +            
            '<td>\
                <button class="btn btn-outline-dark" onclick="editar(' + id + ')" disabled>Modificar</button>\
                <button class="btn btn-outline-dark" onclick="eliminar(' + id + ')" disabled>Borrar</button>\
            </td>\
            </tr>';
      }

      document.getElementById("registros").innerHTML = registros;
    }
  };

  peticion.open("GET", url, true);
  peticion.send();
}
