<?php
    // Define a class named Database
    class Database {

    // Declare $db to hold the database connection
    public $db;

    // Method to establish a database connection from other scripts
    public function getConnection(){
        // Initialize the database connection as null
        $this->db = null;
        try {
            // Setting $db to the database with the listed credentials
            $this->db = new mysqli('localhost', 'root', '', 'music_db_test');
        } catch (Exception $e) {
            // If an exception (error) occurs during the connection attempt, print an error message
            echo "Database could not be connected: " . $e->getMessage();
        }
        // Return the database connection, whether it was successfully established or not
        return $this->db;
    }
}
?>