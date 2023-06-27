<?php
require_once '../config.php';
header("Content-Type: text/html;charset=utf-8");

$valido['success']=array('success'=>false, 
'mensaje'=>"",
'alumnoid'=>"",
'num_control'=>"",
'nombre'=>"",
'fecha_nac'=>"",
'grupo'=>"",
'carrera'=>"");

if($_POST){
    $id=$_POST['alumnoid'];
    $sql="SELECT * FROM alumno WHERE alumnoid=$id";
    $resultado=$cx->query($sql);
    $row=$resultado->fetch_array();
    $valido['success']=true;
    $valido['mensaje']="SE ENCONTRO REGISTRO";
    $valido['alumnoid']=$row[0];
    $valido['num_control']=$row[1];
    $valido['nombre']=$row[2];
    $valido['fecha_nac']=$row[3];
    $valido['grupo']=$row[4];
    $valido['carrera']=$row[5];
}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR AL CARGAR CONTACTO";
}
$cx->close();
echo json_encode($valido);

?>