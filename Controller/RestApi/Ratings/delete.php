<?php

    //Catches any errors
    error_reporting(E_ALL); 
    ini_set('display_errors', 1);
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../../../Model/database.php';
    include_once '../../../Model/ratings.php';

    $database = new Database();
    $db = $database->getConnection();
    $item = new Ratings($db);

    $item->song = isset($_GET['song']) ? $_GET['song'] : die("Song parameter is missing.");


    if ($item->deleteRating()) {
        echo json_encode(array("message" => "Rating deleted."));
    } else {
        echo json_encode(array("message" => "Data could not be deleted"));
    }
?>
