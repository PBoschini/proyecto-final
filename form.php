<?php

    $nombre = $_post['nombre'];
    $apellido = $_post['apellido'];
    $email = $_post['email'];

    $para = 'pablo.boschini@gmail.com';
    $asunto = 'Contacto de registro Eminem Fans'


    mail($para, $asunto, utf8_decode($nombre, $apellido, $email));

    header('location:index.html')

?>

