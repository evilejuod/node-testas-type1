-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 26, 2021 at 05:26 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usersbillsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `group_id`, `amount`, `description`) VALUES
(1, 1, 455, 'For the car'),
(2, 1, 23, 'For paper'),
(3, 1, 40, 'For electricity');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id_group` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `id_group`, `user_id`) VALUES
(1, 'Our Trip to SF', 0, 7),
(2, 'Our Trip to SF', 0, 7),
(3, 'Our Trip to New York', 0, 7),
(4, 'Our Trip to Las Vegas', 0, 3),
(5, 'Our Trip to SF', 0, 2),
(6, 'name', 123456, 7),
(7, 'name', 12, 7),
(8, 'name', 12, 7),
(9, 'name', 23, 7),
(10, 'name', 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `reg_timestamp`) VALUES
(2, 'Emma Smith', 'emma@gmail.com', '$2a$10$3SbhZixvKp1KlKe6sGLFuu3IdSu3bgK/WdkSuAZqDwqpYvHKLWEMO', '2021-10-25 09:14:19'),
(3, 'Rick Novak', 'rickN@gmail.com', '$2a$10$8zwOZtvrUY0.qmeznFvMJOmcx37hOq0QmEgqx2PZuuYUrvTUQz7ni', '2021-10-25 09:16:14'),
(4, 'Susan Connor', 'susanC@gmail.com', '$2a$10$YKGymQykbSICKp4ex5uLL.JguttS2N06KEdJg36OssWYRo4WtDvoC', '2021-10-25 09:16:37'),
(5, 'Ronald Barr', 'ronaldB@gmail.com', '$2a$10$L19e5oxV0VntQp2tY24eveM1taPYqLayPkjnjRZwH4lOeTGH7S2zS', '2021-10-25 09:17:19'),
(6, 'Roger Lum', 'rogerLum@gmail.com', '$2a$10$wTY3Skh.hK5m6foVAjRgiuKdJ/izULNEUX7mkUhHrD0rvyw4GeR7K', '2021-10-25 09:17:43'),
(7, 'Simon Lum', 'simon@gmail.com', '$2a$10$xZx0NT412MBUOZbixLNB9OYnqZ9tsNXN4UBPL8.KhV5Af8T09bz56', '2021-10-25 14:24:14'),
(8, 'Emma Watson', 'emmaW@gmail.com', '$2a$10$0AIdi/U4U.XtIXag42aRM.MdzBoE4QAR4vYL87NXTRPWKH3TaM1P.', '2021-10-25 15:42:39'),
(9, 'Tommy Tomson', 'tommyT@gmail.com', '$2a$10$OrGzLoAdSUoqI4WBKf9C4eyPF9XItQqSoZwQBt7MpYEDMqvw5VdFu', '2021-10-25 15:45:30'),
(10, 'Tommyy Tomson', 'tommyyT@gmail.com', '$2a$10$2rO8JfQQUH70mY4RreBNMektnPfMYHlNW2Eh9TUpXjyhA2iTke1dC', '2021-10-25 15:46:15'),
(13, 'Evilė Juodžiukynaitė', 'simonfdgfd@gmail.com', '$2a$10$5mxf8iUu1Y1PArCrNKGfFezi8wXnm3chEAbwKGvGI9IvzvhqZlqUy', '2021-10-26 11:00:50'),
(15, 'sdsadsad', 'simofgfdn@gmail.com', '$2a$10$NpiVC2pskpiENP5wdRz0DO.GbS.ElE91jF13LNvZaD1HCkWcGGFZa', '2021-10-26 11:01:38'),
(16, 'sdsadsaddsf', 'blabla@gmail.com', '$2a$10$SJgntXQCetpVIajQY.G51OP14tN/jYPUe4cam7by31BKbD5PXoARi', '2021-10-26 11:02:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `billsToGroup` (`group_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `billsToGroup` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
