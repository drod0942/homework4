<?php
header("Access-Control-Allow-Origin: http://129.133.190.217");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Catch any errors
error_reporting(E_ALL);
ini_set('display_errors', 1);

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->login)) {
  $username = $data->username;
  $password = $data->password;

    // Checking if credentials exist
    require_once "../../../Model/database.php";

    // Create an object of the Database class
    $database = new Database();
    // Get the database connection
    $conn = $database->getConnection();

    $sql = "SELECT username, password FROM users WHERE username = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $db_username, $db_password);

    if (mysqli_stmt_fetch($stmt)) {
        // Verify the password
        if (password_verify($password, $db_password)) {
            // Start a new session
            session_start();
            $_SESSION["user"] = $username;
            $_SESSION["logged"] = "yes";

            // Send the session info to the front end to keep track of logged in user
            echo json_encode(array(
                "message" => "Login successful",
                "user" => $_SESSION["user"],
                "logged" => $_SESSION["logged"]
            ));
        } else {
            echo json_encode(["error" => "Password does not match"]);
        }
    } else {
        echo json_encode(["error" => "Username does not exist"]);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["error" => "Login request not received"]);
}
?>