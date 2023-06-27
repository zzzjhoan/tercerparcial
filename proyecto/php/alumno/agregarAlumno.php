<?php
require_once '../config.php';

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
    $num_control=$_POST['num_control'];
    $nombre=$_POST['nombre'];
    $fecha_nac=$_POST['fecha_nac'];
    $grupo=$_POST['grupo'];
    $carrera=$_POST['carrera'];
    
    $sqlInsertar="INSERT INTO alumno VALUES(null,'$num_control','$nombre','$fecha_nac','$grupo','$carrera')";
    if($cx->query($sqlInsertar)===true){
        $valido['success']=true;
        $valido['mensaje']="SE GUARDO CORRECTAMENTE";
    }else{
        $valido['success']=false;
        $valido['mensaje']="ERROR: NO SE GUARDO";
    }

}else{
    $valido['success']=false;
    $valido['mensaje']="NO SE GUARDO";
}
echo json_encode($valido);



?>