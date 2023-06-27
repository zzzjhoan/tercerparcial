var urlServer="";
var sesion=localStorage.getItem("nombre");

const checarSesion=()=>{
  if(sesion==null){
    window.location.href="index.html";
  }
  document.querySelector("#usuario").innerHTML=sesion;
}

const cerrarSesion=()=>{
    localStorage.clear();
    window.location.href="index.html";
}


const agregarAlumno=async()=>{
    var num_control=document.querySelector("#num_control").value;
    var nombre=document.querySelector("#nombre").value;
    var fecha_nac=document.querySelector("#fecha_nac").value;
    var grupo=document.querySelector("#grupo").value;
    var carrera=document.querySelector("#carrera").value;
    

    if(num_control.trim()==='' ||
    nombre.trim()==='' ||
    fecha_nac.trim()==='' ||
    grupo.trim()==='' ||
    carrera.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD ALUMNOS'
          })  
        return;       
    }


    // INSERTAR A LA BASE DE DATOS
    const datos=new FormData();
    datos.append("num_control",num_control);
    datos.append("nombre",nombre);
    datos.append("fecha_nac",fecha_nac);
    datos.append("grupo",grupo);
    datos.append("carrera",carrera);
    

    var respuesta=await fetch(urlServer+"php/alumno/agregarAlumno.php",{
        method:'POST',
        body:datos
    });

    var resultado=await respuesta.json();

    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO!',
            text: resultado.mensaje,
            footer: 'CRUD ALUMNOS'
          }) 
          document.querySelector("#formAgregar").reset();
         
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD ALUMNOS'
          }) 
    }
    document.querySelector("#agregarModal").click();
    cargarAlumnos();
}

const cargarAlumnos=async()=>{

    var respuesta=await fetch(urlServer+"php/alumno/cargarAlumnos.php",{});
    var registrosHTML=``;
    var resultado=await respuesta.json();

    //console.log(resultado);

    resultado.data.forEach(fila=>{
        registrosHTML+=`
        <tr>
        <td>${fila[1]}</td>
        <td>${fila[2]}</td>
        <td>${fila[3]}</td>
        <td>${fila[4]}</td>
        <td>${fila[5]}</td>
        <td><button class="btn btn-success "  data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarAlumno(${fila[0]})"><i class="bi bi-pencil-square p-1"></i>Editar</button></td>
        <td><button class="btn btn-danger" onclick="eliminarAlumno(${fila[0]})"> <i class="bi bi-trash p-1"></i>Eliminar</button></td>
      </tr>
        `;
    });
    document.querySelector("#registros").innerHTML=registrosHTML;

}

const eliminarAlumno=(alumnoid)=>{
    Swal.fire({
        title: '¿Estás seguro de eliminar este Alumno?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        confirmButtonColor: '#198754',
        denyButtonText: 'NO',
      }).then(async(result) => {
        if (result.isConfirmed) {

            const datos=new FormData();
                datos.append("alumnoid",alumnoid);

            var respuesta=await fetch(urlServer+"php/alumno/eliminarAlumno.php",{
                method:'POST',
                body:datos
            });
        
            var resultado=await respuesta.json();
        
            if(resultado.success==true){
                Swal.fire({
                    icon: 'success',
                    title: 'EXITO!',
                    text: resultado.mensaje,
                    footer: 'CRUD ALUMNOS'
                  }) 
                 
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: resultado.mensaje,
                    footer: 'CRUD ALUMNOS'
                  }) 
            }
            cargarAlumnos();         
        } 
      })
}

const cargarAlumno=async(alumnoid)=>{
    const datos=new FormData();
    datos.append("alumnoid",alumnoid);
    
    var respuesta=await fetch(urlServer+"php/alumno/cargarAlumno.php",{
        method:'POST',
        body:datos
    });
    
    var resultado=await respuesta.json();

    document.querySelector("#alumnoid").value=resultado.alumnoid;
    document.querySelector("#enum_control").value=resultado.num_control;
    document.querySelector("#enombre").value=resultado.nombre;
    document.querySelector("#efecha_nac").value=resultado.fecha_nac;
    document.querySelector("#egrupo").value=resultado.grupo;
    document.querySelector("#ecarrera").value=resultado.carrera;

}

const editarAlumno=async()=>{
    var alumnoid=document.querySelector("#alumnoid").value;
    var num_control=document.querySelector("#enum_control").value;
    var nombre=document.querySelector("#enombre").value;
    var fecha_nac=document.querySelector("#efecha_nac").value;
    var grupo=document.querySelector("#egrupo").value;
    var carrera=document.querySelector("#ecarrera").value;

    if(num_control.trim()==='' ||
    nombre.trim()==='' ||
    fecha_nac.trim()==='' ||
    grupo.trim()==='' ||
    carrera.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD ALUMNOS'
          })  
        return;       
    }

     // MODIFICAR EN LA BASE DE DATOS
     const datos=new FormData();
     datos.append("alumnoid",alumnoid);
     datos.append("num_control",num_control);
     datos.append("nombre",nombre);
     datos.append("fecha_nac",fecha_nac);
     datos.append("grupo",grupo);
     datos.append("carrera",carrera);
     
 
     var respuesta=await fetch(urlServer+"php/alumno/editarAlumno.php",{
         method:'POST',
         body:datos
     });
 
     var resultado=await respuesta.json();
     document.querySelector("#editarModal").click();
     if(resultado.success==true){        
         Swal.fire({
             icon: 'success',
             title: 'EXITO!',
             text: resultado.mensaje,
             footer: 'CRUD ALUMNOS'
           }) 
           document.querySelector("#formEditar").reset();
          
     }else{
         Swal.fire({
             icon: 'error',
             title: 'ERROR',
             text: resultado.mensaje,
             footer: 'CRUD ALUMNOS'
           }) 
     }     
     cargarAlumnos();

}