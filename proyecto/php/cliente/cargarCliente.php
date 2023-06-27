<?php
require_once '../config.php';
header("Content-Type: text/html;charset=utf-8");

$valido['success']=array('success'=>false, 
'mensaje'=>"",
'id_cliente'=>"",
'nombre'=>"",
'muni'=>"",
'telefono'=>"");

if($_POST){
    $id=$_POST['id_cliente'];
    $sql="SELECT * FROM cliente WHERE id_cliente=$id";
    $resultado=$cx->query($sql);
    $row=$resultado->fetch_array();
    $valido['success']=true;
    $valido['mensaje']="SE ENCONTRO REGISTRO";
    $valido['id_cliente']=$row[0];
    $valido['nombre']=$row[1];
    $valido['muni']=$row[2];
    $valido['telefono']=$row[3];
}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR AL CARGAR CLIENTE";
}
$cx->close();
echo json_encode($valido);

?>