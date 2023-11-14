<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


include_once '../../../Model/database.php';
include_once '../../../Model/ratings.php';

$database = new Database();
$db = $database->getConnection();
$item = new Ratings($db);


$data = json_decode(file_get_contents("php://input"));

if (isset($data->id) && isset($data->username)) {
    $item->id = $data->id;

    $result = $item->incrementLikes($data->username); // Pass the username to incrementLikes

    if ($result == "liked") {
        echo json_encode(array("message" => "Likes updated successfully.", "action" => "liked"));
    } elseif ($result == "unliked") {
        echo json_encode(array("message" => "Likes updated successfully.", "action" => "unliked"));
    } else {
        echo json_encode(array("message" => "Unable to update likes."));
    }
} else {
    echo json_encode(array("message" => "Incomplete data provided."));
}
?>
