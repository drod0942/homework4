<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../../Model/database.php';
include_once '../../../Model/ratings.php';

$database = new Database();
$db = $database->getConnection();
$items = new Ratings($db);
$records = $items->getRatings();
$itemCount = $records->num_rows;

if ($itemCount > 0) {
    $ratingsArr = array();
    $ratingsArr["itemCount"] = $itemCount;
    $ratingsArr["body"] = array();

    while ($row = $records->fetch_assoc()) {
        array_push($ratingsArr["body"], $row);
    }

    echo json_encode($ratingsArr);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No record found.")
    );
}
?>
