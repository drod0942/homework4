<?php

    //Catches any errors
    error_reporting(E_ALL); 
    ini_set('display_errors', 1);

    class Ratings{

        private $db;

        // Table
        private $db_table2 = "ratings";
        

        // Columns
        public $id;
        public $username;
        public $artist;
        public $song;
        public $rating;

        public $result;

        // Initializes the input database to the variable $db
        public function __construct($db){
            $this->db = $db;
        }

        // GET ALL
        public function getRatings(){
            $sqlQuery = "SELECT id, username, artist, song, rating FROM " . $this->db_table2 . "";
            $this->result = $this->db->query($sqlQuery);
            return $this->result;
        }

        // CREATE
        public function createRating(){
            // Sanitize input
            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->artist = htmlspecialchars(strip_tags($this->artist));
            $this->song = htmlspecialchars(strip_tags($this->song));
            $this->rating = (int)$this->rating; // Ensure rating is an integer

            // Prepare the SQL statement
            $sqlQuery = "INSERT INTO " . $this->db_table2 . " (username, artist, song, rating) VALUES (?, ?, ?, ?)";

            $stmt = $this->db->prepare($sqlQuery);

            // Bind parameters
            $stmt->bind_param("sssi", $this->username, $this->artist, $this->song, $this->rating);

            // Execute the statement
            if ($stmt->execute()) {
                return true;
            }

            return false;
        }



        // DELETE
        function deleteRating() {
            $song = $this->db->real_escape_string($this->song); // Sanitize the input
            $sqlQuery = "DELETE FROM " . $this->db_table2 . " WHERE song = '" . $song . "'";
            $this->db->query($sqlQuery);

            if ($this->db->affected_rows > 0) {
                return true;
            }

            return false;
        }


        public function getSingleUser(){
            $username = $this->db->real_escape_string($this->username);  // Sanitize the input
            $sqlQuery = "SELECT id, username FROM " . $this->db_table2 . " WHERE username = '$username'";
            $record = $this->db->query($sqlQuery);
            $dataRow = $record->fetch_assoc();
            $this->id = $dataRow['id'];
            $this->username = $dataRow['username'];
        }
        

                // UPDATE
        public function updateRating(){
            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->artist = htmlspecialchars(strip_tags($this->artist));
            $this->song = htmlspecialchars(strip_tags($this->song));
            $this->rating = (int)$this->rating; // Ensure rating is an integer

            $sqlQuery = "UPDATE ". $this->db_table2 ." SET 
                        artist = '".$this->artist."',
                        song = '".$this->song."',
                        rating = '".$this->rating."'
                        WHERE id = '".$this->id."'";

            $this->db->query($sqlQuery);

            if($this->db->affected_rows > 0){
                return true;
            }

            return false;
            }


    }
?>