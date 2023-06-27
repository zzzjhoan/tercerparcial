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


const agregarCliente= async()=>{
    var nombre=document.querySelector("#nombre").value;
    var muni=document.querySelector("#muni").value;
    var telefono=document.querySelector("#telefono").value;
    

    if(nombre.trim()==='' ||
    muni.trim()==='' ||
    telefono.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD CLIENTES'
          })  
        return;       
    }


    // INSERTAR A LA BASE DE DATOS
    const datos=new FormData();
    datos.append("nombre",nombre);
    datos.append("muni",muni);
    datos.append("telefono",telefono);
    

    var respuesta=await fetch(urlServer+"php/cliente/agregarCliente.php",{
        method:'POST',
        body:datos
    });

    var resultado=await respuesta.json();

    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO!',
            text: resultado.mensaje,
            footer: 'CRUD CLIENTES'
          }) 
          document.querySelector("#formAgregar").reset();
         
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD CLIENTES'
          }) 
    }
    document.querySelector("#agregarModal").click();
    cargarClientes();
}

const cargarClientes=async()=>{

    var respuesta=await fetch(urlServer+"php/cliente/cargarClientes.php",{});
    var registrosHTML=``;
    var resultado=await respuesta.json();

    //console.log(resultado);

    resultado.data.forEach(fila=>{
        registrosHTML+=`
        <tr>
        <td>${fila[1]}</td>
        <td>${fila[2]}</td>
        <td>${fila[3]}</td>
        <td><button class="btn btn-success "  data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarCliente(${fila[0]})"><i class="bi bi-pencil-square p-1"></i>Editar</button></td>
        <td><button class="btn btn-danger" onclick="eliminarCliente(${fila[0]})"> <i class="bi bi-trash p-1"></i>Eliminar</button></td>
      </tr>
        `;
    });
    document.querySelector("#registros").innerHTML=registrosHTML;

}

const eliminarCliente=(id_cliente)=>{
    Swal.fire({
        title: '¿Estás seguro de eliminar este cliente?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        confirmButtonColor: '#198754',
        denyButtonText: 'NO',
      }).then(async(result) => {
        if (result.isConfirmed) {

            const datos=new FormData();
                datos.append("id_cliente",id_cliente);

            var respuesta=await fetch(urlServer+"php/cliente/eliminarCliente.php",{
                method:'POST',
                body:datos
            });
        
            var resultado=await respuesta.json();
        
            if(resultado.success==true){
                Swal.fire({
                    icon: 'success',
                    title: 'EXITO!',
                    text: resultado.mensaje,
                    footer: 'CRUD CLIENTES'
                  }) 
                 
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: resultado.mensaje,
                    footer: 'CRUD CLIENTES'
                  }) 
            }
            cargarClientes();         
        } 
      })
}

const cargarCliente=async(id_cliente)=>{
    const datos=new FormData();
    datos.append("id_cliente",id_cliente);
    
    var respuesta=await fetch(urlServer+"php/cliente/cargarCliente.php",{
        method:'POST',
        body:datos
    });
    
    var resultado=await respuesta.json();

    document.querySelector("#id_cliente").value=resultado.id_cliente;
    document.querySelector("#enombre").value=resultado.nombre;
    document.querySelector("#emuni").value=resultado.muni;
    document.querySelector("#etelefono").value=resultado.telefono;

}

const editarCliente=async()=>{
    var id_cliente=document.querySelector("#id_cliente").value;
    var nombre=document.querySelector("#enombre").value;
    var municipio=document.querySelector("#emuni").value;
    var telefono=document.querySelector("#etelefono").value;

    if(nombre.trim()==='' ||
    municipio.trim()==='' ||
    telefono.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD CLIENTES'
          })  
        return;       
    }

     // MODIFICAR EN LA BASE DE DATOS
     const datos=new FormData();
     datos.append("id_cliente",id_cliente);
     datos.append("nombre",nombre);
     datos.append("municipio",municipio);
     datos.append("telefono",telefono);
     
 
     var respuesta=await fetch(urlServer+"php/cliente/editarCliente.php",{
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
             footer: 'CRUD CONTACTOS'
           }) 
           document.querySelector("#formEditar").reset();
          
     }else{
         Swal.fire({
             icon: 'error',
             title: 'ERROR',
             text: resultado.mensaje,
             footer: 'CRUD CLIENTES'
           }) 
     }     
     cargarClientes();

}