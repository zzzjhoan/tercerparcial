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


const agregarAuto= async()=>{
    var marca=document.querySelector("#marca").value;
    var modelo=document.querySelector("#modelo").value;
    var color=document.querySelector("#color").value;
    var año=document.querySelector("#año").value;
    var costo=document.querySelector("#costo").value;
    

    if(marca.trim()==='' ||
    modelo.trim()==='' ||
    color.trim()==='' ||
    año.trim()==='' ||
    costo.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD CONTACTOS'
          })  
        return;       
    }


    // INSERTAR A LA BASE DE DATOS
    const datos=new FormData();
    datos.append("marca",marca);
    datos.append("modelo",modelo);
    datos.append("color",color);
    datos.append("año",año);
    datos.append("costo",costo);
    

    var respuesta=await fetch(urlServer+"php/auto/agregarAuto.php",{
        method:'POST',
        body:datos
    });

    var resultado=await respuesta.json();

    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO!',
            text: resultado.mensaje,
            footer: 'CRUD AUTOS'
          }) 
          document.querySelector("#formAgregar").reset();
         
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD AUTOS'
          }) 
    }
    document.querySelector("#agregarModal").click();
    cargarAutos();
}

const cargarAutos=async()=>{

    var respuesta=await fetch(urlServer+"php/auto/cargarAutos.php",{});
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
        <td><button class="btn btn-success "  data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarAuto(${fila[0]})"><i class="bi bi-pencil-square p-1"></i>Editar</button></td>
        <td><button class="btn btn-danger" onclick="eliminarAuto(${fila[0]})"> <i class="bi bi-trash p-1"></i>Eliminar</button></td>
      </tr>
        `;
    });
    document.querySelector("#registros").innerHTML=registrosHTML;

}

const eliminarAuto=(autoid)=>{
    Swal.fire({
        title: '¿Estás seguro de eliminar este Auto?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        confirmButtonColor: '#198754',
        denyButtonText: 'NO',
      }).then(async(result) => {
        if (result.isConfirmed) {

            const datos=new FormData();
                datos.append("autoid",autoid);

            var respuesta=await fetch(urlServer+"php/auto/eliminarAuto.php",{
                method:'POST',
                body:datos
            });
        
            var resultado=await respuesta.json();
        
            if(resultado.success==true){
                Swal.fire({
                    icon: 'success',
                    title: 'EXITO!',
                    text: resultado.mensaje,
                    footer: 'CRUD CONTACTOS'
                  }) 
                 
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: resultado.mensaje,
                    footer: 'CRUD AUTOS'
                  }) 
            }
            cargarAutos();         
        } 
      })
}

const cargarAuto=async(autoid)=>{
    const datos=new FormData();
    datos.append("autoid",autoid);
    
    var respuesta=await fetch(urlServer+"php/auto/cargarAuto.php",{
        method:'POST',
        body:datos
    });
    
    var resultado=await respuesta.json();

    document.querySelector("#autoid").value=resultado.autoid;
    document.querySelector("#emarca").value=resultado.marca;
    document.querySelector("#emodelo").value=resultado.modelo;
    document.querySelector("#ecolor").value=resultado.color;
    document.querySelector("#eaño").value=resultado.año;
    document.querySelector("#ecosto").value=resultado.costo;

}

const editarAuto=async()=>{
    var autoid=document.querySelector("#autoid").value;
    var marca=document.querySelector("#emarca").value;
    var modelo=document.querySelector("#emodelo").value;
    var color=document.querySelector("#ecolor").value;
    var año=document.querySelector("#eaño").value;
    var costo=document.querySelector("#ecosto").value;

    if(marca.trim()==='' ||
    modelo.trim()==='' ||
    color.trim()==='' ||
    año.trim()==='' ||
    costo.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD AUTOS'
          })  
        return;       
    }

     // MODIFICAR EN LA BASE DE DATOS
     const datos=new FormData();
     datos.append("autoid",autoid);
     datos.append("marca",marca);
     datos.append("modelo",modelo);
     datos.append("color",color);
     datos.append("año",año);
     datos.append("costo",costo);
     
 
     var respuesta=await fetch(urlServer+"php/auto/editarAuto.php",{
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
             footer: 'CRUD AUTOS'
           }) 
           document.querySelector("#formEditar").reset();
          
     }else{
         Swal.fire({
             icon: 'error',
             title: 'ERROR',
             text: resultado.mensaje,
             footer: 'CRUD AUTOS'
           }) 
     }     
     cargarAutos();

}