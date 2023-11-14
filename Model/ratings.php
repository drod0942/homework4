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
        public $likes;

        public $result;

        // Initializes the input database to the variable $db
        public function __construct($db){
            $this->db = $db;
        }

        // GET ALL
        public function getRatings(){
            $sqlQuery = "SELECT id, username, artist, song, rating, likes FROM " . $this->db_table2 . "";
            $this->result = $this->db->query($sqlQuery);
            return $this->result;
        }

        public function incrementLikes($username) {
            // Check if the user has already liked the song
            $checkQuery = "SELECT * FROM user_likes WHERE username = ? AND song_id = ?";
            $checkStmt = $this->db->prepare($checkQuery);
            $checkStmt->bind_param("si", $username, $this->id);
            $checkStmt->execute();
            $result = $checkStmt->get_result();

            if ($result->num_rows > 0) {
                // User has liked the song, so unlike it
                $unlikeQuery = "DELETE FROM user_likes WHERE username = ? AND song_id = ?";
                $unlikeStmt = $this->db->prepare($unlikeQuery);
                $unlikeStmt->bind_param("si", $username, $this->id);
                $unlikeStmt->execute();

                // Decrease the likes count
                $decreaseLikesQuery = "UPDATE " . $this->db_table2 . " SET likes = likes - 1 WHERE id = ?";
                $decreaseStmt = $this->db->prepare($decreaseLikesQuery);
                $decreaseStmt->bind_param("i", $this->id);
                $decreaseStmt->execute();

                return "unliked";
            } else {
                // User has not liked the song, so like it
                $likeQuery = "INSERT INTO user_likes (username, song_id) VALUES (?, ?)";
                $likeStmt = $this->db->prepare($likeQuery);
                $likeStmt->bind_param("si", $username, $this->id);
                $likeStmt->execute();

                // Increase the likes count
                $increaseLikesQuery = "UPDATE " . $this->db_table2 . " SET likes = likes + 1 WHERE id = ?";
                $increaseStmt = $this->db->prepare($increaseLikesQuery);
                $increaseStmt->bind_param("i", $this->id);
                $increaseStmt->execute();

                return "liked";
            }
        }

        
        // CREATE
        public function createRating(){
            // Sanitize input
            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->artist = htmlspecialchars(strip_tags($this->artist));
            $this->song = htmlspecialchars(strip_tags($this->song));
        // Ensure rating is an integer
        $this->rating = (int)$this->rating;

        // Prepare the SQL statement
        $sqlQuery = "INSERT INTO " . $this->db_table2 . " (username, artist, song, rating, likes) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($sqlQuery);

        $likes = 0; // Initialize likes to 0

        // Bind parameters
        $stmt->bind_param("sssii", $this->username, $this->artist, $this->song, $this->rating, $likes);

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