-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 14, 2023 at 03:00 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music_db_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `artist` varchar(255) NOT NULL,
  `song` varchar(255) NOT NULL,
  `rating` int(1) DEFAULT NULL,
  `likes` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `username`, `artist`, `song`, `rating`, `likes`) VALUES
(42, 'bringyourownbleach', 'declan mckenna', 'brazil', 4, 3),
(44, 'alnora', 'Taylor Switch', 'Willow', 2, 1),
(45, 'gayp', 'meena from sing 2', 'happy birthday song', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('alNora', '$2y$10$0cHkjikDey4228l5zZUGueNjzqyDZow.xVUsFS4hz7.BfVCzZuEGu'),
('alnora2', '$2y$10$XbZLwxGuXeNhNyIqxFF0rurMcMb../ltRrNcqGX2a7wULi4WnAxA2'),
('alnora3', '$2y$10$cBJ.18vf9JzCtDClgu7OpuZgC/lphoF.u.nU26iExxGCFfxFvSWUG'),
('bringyourownbleach', '$2y$10$KzYh94NIaWm7p2rwIWUdm.Mw.pe1EJd4MtbSdV6Y2VAS6ddn8cCMS'),
('drod0942', '$2y$10$arlnxMd/eEOBjHwIYDaWbu.dq8ItOyqPAaVliSikghChzRLgNQPge'),
('drod0943', '$2y$10$37kPEElJyHt./FcHEnDOD.tJgZu/W5gIn9MTYI94607F5qm5Ny07m'),
('gayp', '$2y$10$/xVh9b3TibsfuasYncNywODfG8koCwNDKAnQA.M/K0srOXD7e17jG'),
('jackboidead', '$2y$10$FopHrkx5tLfgmGVYGBZx3eo0oFIuSPlMbfNx5iP1kBy3qKTKn1SSi'),
('jjohnston01', '$2y$10$H.k6Cw4sxK9wejBwAwp9P.EdjJvauM6QxAi.4z1LWD31fYLZ91JFm'),
('kandyman', '$2y$10$G/tuf8OCL8G4WGl709HNLeKBEsrCy13cJOv80sxnxd73.RwStbGHm'),
('thatboidead', '$2y$10$Rod9/Yemyp1Dglf5tz6zruOuuxpEafiGC7G0D8WCRGNr61OhS2sj6');

-- --------------------------------------------------------

--
-- Table structure for table `user_likes`
--

CREATE TABLE `user_likes` (
  `username` varchar(255) NOT NULL,
  `song_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_likes`
--

INSERT INTO `user_likes` (`username`, `song_id`) VALUES
('gayp', 42),
('gayp', 44),
('gayp', 45);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `song` (`song`),
  ADD KEY `ratings_ibfk_1` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `user_likes`
--
ALTER TABLE `user_likes`
  ADD PRIMARY KEY (`username`,`song_id`),
  ADD KEY `song_id` (`song_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE SET NULL;

--
-- Constraints for table `user_likes`
--
ALTER TABLE `user_likes`
  ADD CONSTRAINT `user_likes_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `user_likes_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `ratings` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
