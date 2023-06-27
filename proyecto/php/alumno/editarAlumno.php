<?php
require_once '../config.php';

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
    $id=$_POST['alumnoid'];
    $num_control=$_POST['num_control'];
    $nombre=$_POST['nombre'];
    $fecha_nac=$_POST['fecha_nac'];
    $grupo=$_POST['grupo'];
    $carrera=$_POST['carrera'];
    
    $sqlEditar="UPDATE alumno SET 
                num_control='$num_control',
                nombre='$nombre',
                fecha_nac='$fecha_nac',
                grupo='$grupo',
                carrera='$carrera'
                WHERE alumnoid=$id";
    if($cx->query($sqlEditar)===true){
        $valido['success']=true;
        $valido['mensaje']="SE ACTUALIZO CORRECTAMENTE";
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