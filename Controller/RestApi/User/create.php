<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../../Model/database.php';
    include_once '../../../Model/users.php';

    $database = new Database();
    $db = $database->getConnection();
    $item = new Users($db);


    $item->username = $_GET['username'];
    $item->password = $_GET['password'];

    if($item->createEmployee()){
        echo 'User created successfully.';
    } else{
        echo 'User could not be created.';
    }
?>