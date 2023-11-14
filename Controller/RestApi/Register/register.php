<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

//Catches any errors
error_reporting(E_ALL); 
ini_set('display_errors', 1);

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->register)) {
    $username = $data->username;
    $password = $data->password;

    // Checking if credentials exist
    require_once "../../../Model/database.php";

    // Create an object of the Database class
    $database = new Database();
    // Get the database connection
    $conn = $database->getConnection();

    $sql = "SELECT username FROM users WHERE username = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $db_username);

    if (mysqli_stmt_fetch($stmt)) {
        echo json_encode(["error" => "Username already exists"]);
    } else {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt,"ss", $username, $passwordHash);
        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(["message" => "Register successful"]);
        } else {
           echo json_encode(["error" => "Something went wrong. Please try again later."]);
        }
    }

    // Close the statement
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["error" => "Register request not received"]);
}
?>

