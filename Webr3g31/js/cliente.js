let nuevo = document.getElementById("nuevo");
let modificar = document.getElementById("modificar");
let borrar = document.getElementById("borrar");
let datos = document.getElementById("datos");
let url


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
  document.getElementById("email").value=""
  document.getElementById("password").value=""
  document.getElementById("age").value=""
  
  nuevo.style.display = "block";
  modificar.style.display = "none";
  borrar.style.display = "none";
  datos.style.display = "none";
  document.getElementById("name").focus()
}

function editar(id) {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url = "http://129.146.131.247:8083/api/Client";

  /*
  2 propiedad onreadystatechange asigna a una funcion
  que funcion valida si la respuesta fue exitosa
  readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
  le aplica formato y modifica la pagina o vista
*/
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let respuesta = JSON.parse(this.responseText)

      let idModif = respuesta.idClient
      let nameModif = respuesta.name
      let emailModif = respuesta.email
      let passwordModif = respuesta.password
      let ageModif = respuesta.age
      

      document.getElementById("idModif").value = idModif
      document.getElementById("nameModif").value = nameModif
      document.getElementById("emailModif").value = emailModif
      document.getElementById("passwordModif").value = passwordModif
      document.getElementById("ageModif").value = ageModif

      //modificamos el titulo para que muestre el valor del codigo de la finca
      document.getElementById("idLabel").innerHTML = "<strong>Farm id :</strong>" + idModif

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
  url = "http://129.146.131.247:8083/api/Client";

  /*
  2 propiedad onreadystatechange asigna a una funcion
  que funcion valida si la respuesta fue exitosa
  readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
  le aplica formato y modifica la pagina o vista
*/
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let respuesta = JSON.parse(this.responseText)

      let idModif = respuesta.idClient
      let nameModif = respuesta.name
      let emailModif = respuesta.email
      let ageModif = respuesta.age

      
      document.getElementById("idDelete").value = idModif
      document.getElementById("idList").innerHTML = "<strong>Id :</strong>" + idModif
      document.getElementById("nameList").innerHTML = "<strong>Address :</strong>" + nameModif
      document.getElementById("emailList").innerHTML = "<strong>Exension :</strong>" + emailModif
      document.getElementById("ageList").innerHTML = "<strong>Farm categoryId :</strong>" + ageModif
      

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
  url = ""
  //recuperar la informacion ingresada en el formulario
  let nameClient = document.getElementById("name").value
  let emailClient = document.getElementById("email").value
  let passwordClient = document.getElementById("password").value
  let ageClient = document.getElementById("age").value

  //creo un objeto javascript
  let objeto = {
    name: nameClient,
    email: emailClient,
    password: passwordClient,
    age: ageClient
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)

  url = "http://129.146.131.247:8083/api/Client/save";

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
  let idModif = document.getElementById("idModif").value
  let nameModif = document.getElementById("nameModif").value
  let emailModif = document.getElementById("emailModif").value
  let passwordModif = document.getElementById("passwordModif").value
  let ageModif = document.getElementById("ageModif").value

  //creo un objeto javascript
  let objeto = {
    idClient: idModif,
    name: nameModif,
    email: emailModif,
    password: passwordModif,
    age: ageModif
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)

  url = "http://129.146.131.247:8083/api/Client/update"

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
  let objeto = {
    idClient: idDelete
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)

  let url = "http://129.146.131.247:8083/api/Client";

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

  peticion.open("DELETE", url, true)
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  peticion.send(objetoJson)
}

function traerdatos() {
  url = "http://129.146.131.247:8083/api/Client/all"
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();

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
        let id = respuesta[i].idClient;
        registros +=
          '<tr>\
                        <th scope="row">' + id +
          "</th>\
           <td>" +
          respuesta[i].name +
          "</td>\
                        <td>" +
          respuesta[i].email +
          "</td>\
                        <td>" +
          respuesta[i].age +
          "</td>" +          
          '<td>\
            <button class="btn btn-outline-dark" onclick="editar(' +
          id +
          ')" disabled>Modificar</button>\
                            <button class="btn btn-outline-dark" onclick="eliminar(' +
          id +
          ')" disabled>Borrar</button>\
                        </td>\
                        </tr>';
      }

      document.getElementById("registros").innerHTML = registros;
    }
  };

  peticion.open("GET", url, true);
  peticion.send();
}
