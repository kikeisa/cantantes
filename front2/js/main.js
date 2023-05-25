
function clear() {

    $("#edit").css("display","hide")
    $('#modal').modal('show');
 $("#nombre").val("")
 $("#apellido").val("")
 $("#nacimiento").val("")
 $("#Biografia").val("")

}



function getCantantes() {
  $.ajax({
    url: `http://localhost/pruebaT/codeigniter4/back/public/cantantes`,
    type: "GET",
    contentType: "application/json",
    crossDomain: true,
    dataType: "json",
    success: function (r) {
      cantantes = r.data;

      let table = "";

      cantantes.forEach((catante) => {
        table +=
          "<tr><td><a class='btn btn-danger' onclick='deleteCantantes("+catante.id+")' >Eliminar</a ><br><a class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'  onclick = 'getbyIdCantante(" +
          catante.id +
          ")'' >Editar</a></td>" +
          "<td>" +
          catante.id +
          "</td><td>" +
          catante.nombre +
          "</td><td>" +
          catante.apellido +
          "</td><td>" +
          catante.nacimiento +
          "</td><td>" +
          catante.Biografia +
          "</td></tr>";
      });

      $("#tableBody").html(table);
    },
    error: function (r) {},
    failure: function (r) {},
  });
}

function getbyIdCantante (id){

    $.ajax({
        url: `http://localhost/pruebaT/codeigniter4/back/public/cantantes/` + id,
        type: "GET",
        contentType: "application/json",
        crossDomain: true,
        dataType: "json",
        success: function (r) {
            $("#id").val(r.data.id),
          $("#nombre").val(r.data.nombre),
            $("#apellido").val(r.data.apellido),
            $("#nacimiento").val(r.data.nacimiento),
            $("#Biografia").val(r.data.Biografia);
        },
        error: function (r) {},
        failure: function (r) {},
      });

}

function editCantantes() {

    if ($("#nombre").val() == "") {
        alert("Digite todos los campos");
        return;
      }
      if ($("#apellido").val() == "") {
        alert("Digite todos los campos");
        return;
      }
    
      if ($("#nacimiento").val() == "") {
        alert("Digite todos los campos");
        return;
      }
    
      if ($("#Biografia").val() == "") {
        alert("Digite todos los campos");
        return;
      }

   let id =  $("#id").val()
  $.ajax({
    url: `http://localhost/pruebaT/codeigniter4/back/public/cantantes/` + id,
    type: "PUT",
    data: {
      nombre: $("#nombre").val(),
      apellido: $("#apellido").val(),
      nacimiento: $("#nacimiento").val(),
      Biografia: $("#Biografia").val(),
    },
    success: function (r) {
      if ((r.code = 200)) {
        getCantantes();
        $('#modal').modal('hidden');
      }
    },
    error: function (r) {
        alert("ERROR")
    },
    failure: function (r) {
        alert("ERROR")
    },
  });
}

function deleteCantantes(id) {

    $.ajax({
        url: `http://localhost/pruebaT/codeigniter4/back/public/cantantes/`+id,
        type: "DELETE",
        data: {
          nombre: $("#nombre").val(),
          apellido: $("#apellido").val(),
          nacimiento: $("#nacimiento").val(),
          Biografia: $("#Biografia").val(),
        },
        success: function (r) {
          if ((r.code = 200)) {
            getCantantes();
          }
        },
        error: function (r) {
            alert("ERROR")
        },
        failure: function (r) {
            alert("ERROR")
        },
      });

}

function SaveCantantes() {
  if ($("#nombre").val() == "") {
    alert("Digite todos los campos");
    return;
  }
  if ($("#apellido").val() == "") {
    alert("Digite todos los campos");
    return;
  }

  if ($("#nacimiento").val() == "") {
    alert("Digite todos los campos");
    return;
  }

  if ($("#Biografia").val() == "") {
    alert("Digite todos los campos");
    return;
  }

  $.ajax({
    url: `http://localhost/pruebaT/codeigniter4/back/public/cantantes`,
    type: "POST",
    data: {
      nombre: $("#nombre").val(),
      apellido: $("#apellido").val(),
      nacimiento: $("#nacimiento").val(),
      Biografia: $("#Biografia").val(),
    },
    success: function (r) {
      if ((r.code = 200)) {
        getCantantes();
      }
    },
    error: function (r) {},
    failure: function (r) {},
  });
}
