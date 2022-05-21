<?php

    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];

    $para = 'pablo.boschini@gmail.com';
    $asunto = 'Contacto de registro Eminem Fans';


    mail($para, $asunto, utf8_decode($email));

    header('location:exito.html')

?>

