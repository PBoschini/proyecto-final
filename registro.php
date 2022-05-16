<?php
$destinatario = 'pablo.boschini@gmail.com'

$nombre = $_GET['nombre']
$nombre = $_GET['apellido']
$nombre = $_GET['email']


$header ="Enviado desde EminemFans"


mail($destinatario, $nombre, $header);

?>

