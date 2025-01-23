-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 23, 2025 at 01:46 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vue_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `cryptos`
--

CREATE TABLE `cryptos` (
  `id` int(11) NOT NULL,
  `crypto_name` varchar(255) NOT NULL,
  `market_capitalization` decimal(20,2) NOT NULL,
  `current_price` decimal(20,2) DEFAULT NULL,
  `volume_24h` decimal(20,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cryptos`
--

INSERT INTO `cryptos` (`id`, `crypto_name`, `market_capitalization`, `current_price`, `volume_24h`, `created_at`) VALUES
(1, 'Bitcoin', 49381694328759.00, 13190.32, 35000000000.14, '2025-01-21 13:04:24'),
(2, 'Ethereum', 30564589023810.00, 842.14, 25000000000.46, '2025-01-21 13:04:24'),
(3, 'Binance Coin', 20697613567891.00, 132.03, 1500000000.95, '2025-01-21 13:04:24'),
(4, 'Cardano', 12378900043132.00, 2.31, 1200000000.87, '2025-01-21 13:04:24'),
(5, 'Solana', 87649837204329.00, 77.68, 4500000000.48, '2025-01-21 13:04:24'),
(6, 'XRP', 499123485647.00, 2.01, 5000000000.63, '2025-01-21 13:04:24'),
(7, 'Polkadot', 438234078839.00, 26.83, 6000000000.93, '2025-01-21 13:04:24'),
(8, 'Dogecoin', 1483672222389.00, 0.16, 2000000000.35, '2025-01-21 13:04:24'),
(9, 'Chainlink', 902234758293.00, 23.72, 1000000000.13, '2025-01-21 13:04:24'),
(11, 'Bitcoin Cash', 1456208497365.00, 162.99, 2000000000.23, '2025-01-21 13:04:24'),
(12, 'Stellar', 892734982123.00, 0.16, 3200000000.76, '2025-01-21 13:04:24'),
(13, 'Uniswap', 527364902176.00, 3.03, 9000000000.13, '2025-01-21 13:04:24'),
(14, 'VeChain', 547123456783.00, 3.03, 2200000000.99, '2025-01-21 13:04:24'),
(15, 'Shiba Inu', 243567894523.00, 0.00, 1000000000.98, '2025-01-21 13:04:24'),
(16, 'Avalanche', 678234983726.00, 55.16, 1600000000.23, '2025-01-21 13:04:24'),
(17, 'Terra', 235678234573.00, 1.75, 1200000000.10, '2025-01-21 13:04:24'),
(18, 'Cosmos', 543267459123.00, 11.36, 4700000000.38, '2025-01-21 13:04:24'),
(19, 'Polygon', 782364892176.00, 1.51, 7000000000.24, '2025-01-21 13:04:24'),
(20, 'Tron', 438567291824.00, 0.09, 1200000000.36, '2025-01-21 13:04:24'),
(21, 'Filecoin', 324573983653.00, 117.22, 1800000000.45, '2025-01-21 13:04:24'),
(22, 'Aave', 268236975481.00, 582.76, 1100000000.85, '2025-01-21 13:04:24'),
(23, 'SushiSwap', 132674983527.00, 3.26, 3200000000.50, '2025-01-21 13:04:24'),
(24, 'Monero', 114238756872.00, 177.29, 2500000000.62, '2025-01-21 13:04:24'),
(25, 'Tezos', 268902364812.00, 2.46, 4100000000.47, '2025-01-21 13:04:24'),
(26, 'Litecoin', 7348762910328.00, 276.06, 1500000000.68, '2025-01-21 13:04:24'),
(27, 'IOTA', 352324759138.00, 1.95, 1600000000.25, '2025-01-21 13:04:24'),
(28, 'Zcash', 160937483209.00, 121.51, 800000000.34, '2025-01-21 13:04:24'),
(29, 'Hedera', 509238743206.00, 0.09, 1900000000.24, '2025-01-21 13:04:24'),
(30, 'Chiliz', 431024758723.00, 0.40, 8000000000.23, '2025-01-21 13:04:24'),
(31, 'Maker', 620957130223.00, 88.31, 2900000000.85, '2025-01-21 13:04:24'),
(32, 'Quant', 732876834216.00, 497.16, 5000000000.72, '2025-01-21 13:04:24'),
(33, 'ShadowCoin', 1200000000.00, 9.03, 12000000.00, '2025-01-22 14:41:50'),
(34, 'NebulaX', 500000000.00, 1.69, 8000000.00, '2025-01-22 14:41:50'),
(35, 'LunarBits', 2000000000.00, 1.09, 15000000.00, '2025-01-22 14:41:50'),
(36, 'Aetherium', 750000000.00, 4.81, 10000000.00, '2025-01-22 14:41:50'),
(37, 'BlazeToken', 1000000000.00, 1.28, 5000000.00, '2025-01-22 14:41:50'),
(38, 'QuantumFlare', 450000000.00, 7.73, 3000000.00, '2025-01-22 14:41:50'),
(39, 'PyroChain', 250000000.00, 0.16, 2000000.00, '2025-01-22 14:41:50'),
(40, 'SpectraCoin', 1700000000.00, 10.46, 20000000.00, '2025-01-22 14:41:50'),
(41, 'ZenoCash', 3000000000.00, 1.31, 30000000.00, '2025-01-22 14:41:50'),
(42, 'CosmoToken', 220000000.00, 0.16, 1200000.00, '2025-01-22 14:41:50'),
(43, 'StellarWave', 980000000.00, 1.91, 5000000.00, '2025-01-22 14:41:50'),
(44, 'NovaShard', 860000000.00, 3.02, 4000000.00, '2025-01-22 14:41:50'),
(45, 'EclipsePay', 4000000000.00, 5.53, 50000000.00, '2025-01-22 14:41:50'),
(46, 'PhotonEdge', 320000000.00, 1.96, 2500000.00, '2025-01-22 14:41:50'),
(47, 'ZenithCoin', 4500000000.00, 17.99, 60000000.00, '2025-01-22 14:41:50'),
(48, 'OrbitPay', 270000000.00, 0.39, 2000000.00, '2025-01-22 14:41:50'),
(49, 'SkyVault', 1500000000.00, 6.63, 14000000.00, '2025-01-22 14:41:50'),
(50, 'HyperFlux', 3700000000.00, 19.99, 35000000.00, '2025-01-22 14:41:50'),
(51, 'FusionCore', 1900000000.00, 18.57, 18000000.00, '2025-01-22 14:41:50'),
(52, 'AuroraCoin', 2700000000.00, 11.82, 25000000.00, '2025-01-22 14:41:50'),
(53, 'CryoToken', 100000000.00, 0.15, 1000000.00, '2025-01-22 14:41:50'),
(54, 'NebulaNet', 2500000000.00, 1.68, 20000000.00, '2025-01-22 14:41:50'),
(55, 'SolarisPay', 4200000000.00, 14.36, 50000000.00, '2025-01-22 14:41:50'),
(56, 'PulsePay', 800000000.00, 2.58, 7000000.00, '2025-01-22 14:41:50'),
(57, 'MetaByte', 600000000.00, 1.02, 6000000.00, '2025-01-22 14:41:50'),
(58, 'InfinityGem', 1300000000.00, 3.87, 15000000.00, '2025-01-22 14:41:50'),
(59, 'CometCash', 2900000000.00, 15.27, 30000000.00, '2025-01-22 14:41:50'),
(60, 'VortexX', 1600000000.00, 4.90, 19000000.00, '2025-01-22 14:41:50'),
(61, 'AtomicPay', 1100000000.00, 7.18, 13000000.00, '2025-01-22 14:41:50'),
(62, 'HydraCoin', 470000000.00, 1.70, 5000000.00, '2025-01-22 14:41:50'),
(63, 'IonTrail', 900000000.00, 1.12, 9000000.00, '2025-01-22 14:41:50'),
(64, 'NebulaRise', 2000000000.00, 20.89, 20000000.00, '2025-01-22 14:41:50'),
(65, 'EonShift', 850000000.00, 7.38, 7500000.00, '2025-01-22 14:41:50'),
(66, 'Astralis', 3100000000.00, 18.93, 40000000.00, '2025-01-22 14:41:50'),
(67, 'Celestia', 1700000000.00, 6.60, 18000000.00, '2025-01-22 14:41:50'),
(68, 'NovaChain', 180000000.00, 0.94, 1500000.00, '2025-01-22 14:41:50'),
(69, 'QuasarX', 2700000000.00, 9.24, 24000000.00, '2025-01-22 14:41:50'),
(70, 'VoidCoin', 5000000000.00, 12.71, 60000000.00, '2025-01-22 14:41:50'),
(71, 'GammaLink', 1200000000.00, 17.80, 12000000.00, '2025-01-22 14:41:50'),
(72, 'Starlight', 3400000000.00, 16.72, 35000000.00, '2025-01-22 14:41:50'),
(73, 'IgnisPay', 1400000000.00, 3.13, 13000000.00, '2025-01-22 14:41:50'),
(74, 'AstroBits', 330000000.00, 0.65, 3000000.00, '2025-01-22 14:41:50'),
(75, 'VoidCash', 2100000000.00, 12.30, 22000000.00, '2025-01-22 14:41:50'),
(76, 'PlasmaNet', 900000000.00, 3.72, 9000000.00, '2025-01-22 14:41:50'),
(77, 'ChronoLink', 1900000000.00, 9.76, 17000000.00, '2025-01-22 14:41:50'),
(78, 'OrbitalPay', 1000000000.00, 7.02, 14000000.00, '2025-01-22 14:41:50'),
(79, 'LunaLink', 2300000000.00, 15.97, 28000000.00, '2025-01-22 14:41:50'),
(80, 'PulseNet', 270000000.00, 0.34, 2000000.00, '2025-01-22 14:41:50'),
(81, 'SparkleToken', 800000000.00, 0.62, 7000000.00, '2025-01-22 14:41:50'),
(82, 'NovaEdge', 320000000.00, 0.24, 3000000.00, '2025-01-22 14:41:50');

-- --------------------------------------------------------

--
-- Table structure for table `crypto_transactions`
--

CREATE TABLE `crypto_transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `crypto_id` int(11) NOT NULL,
  `amount` decimal(18,8) NOT NULL,
  `price_at_purchase` decimal(18,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crypto_transactions`
--

INSERT INTO `crypto_transactions` (`id`, `user_id`, `crypto_id`, `amount`, `price_at_purchase`, `created_at`, `updated_at`) VALUES
(1, 2, 6, 1.00000000, 2.03, '2025-01-22 15:38:49', '2025-01-22 15:38:49'),
(3, 2, 3, 1.00000000, 265.45, '2025-01-22 15:53:28', '2025-01-22 15:53:28'),
(4, 2, 1, 1.00000000, 47511.30, '2025-01-22 15:57:43', '2025-01-22 19:41:34'),
(5, 2, 3, 3.00000000, 265.45, '2025-01-22 16:01:13', '2025-01-22 16:01:13'),
(6, 2, 6, 1.00000000, 2.03, '2025-01-22 17:28:44', '2025-01-22 17:28:44'),
(7, 2, 6, 0.00000000, 2.03, '2025-01-22 17:31:51', '2025-01-22 19:35:33'),
(8, 2, 4, 0.00000000, 1.81, '2025-01-22 17:35:16', '2025-01-22 19:25:06'),
(9, 2, 3, 0.00000000, 262.52, '2025-01-22 19:36:10', '2025-01-22 19:36:29'),
(10, 11, 4, 0.00000000, 1.74, '2025-01-22 19:45:09', '2025-01-22 19:45:34'),
(11, 12, 5, 0.00000000, 159.00, '2025-01-22 19:47:50', '2025-01-22 19:48:06'),
(12, 12, 1, 0.00000000, 39264.23, '2025-01-22 20:11:46', '2025-01-22 20:16:42'),
(13, 12, 3, 0.00000000, 252.48, '2025-01-22 20:16:56', '2025-01-22 20:17:32'),
(14, 15, 6, 0.00000000, 2.50, '2025-01-22 20:22:21', '2025-01-22 20:22:43'),
(15, 15, 1, 0.00000000, 22665.06, '2025-01-22 20:29:13', '2025-01-22 20:29:25'),
(16, 16, 14, 0.00000000, 2.40, '2025-01-23 11:30:29', '2025-01-23 11:31:07'),
(17, 16, 4, 1.00000000, 2.90, '2025-01-23 11:31:13', '2025-01-23 11:31:13'),
(18, 16, 9, 0.00000000, 25.89, '2025-01-23 11:31:16', '2025-01-23 11:31:53'),
(19, 16, 26, 1.00000000, 363.79, '2025-01-23 11:31:27', '2025-01-23 11:31:27'),
(20, 16, 3, 1.00000000, 123.10, '2025-01-23 12:31:33', '2025-01-23 12:31:33'),
(21, 16, 5, 10.00000000, 84.74, '2025-01-23 12:31:37', '2025-01-23 12:31:37'),
(22, 16, 3, 2.00000000, 124.68, '2025-01-23 12:32:36', '2025-01-23 12:32:36');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `quote` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `name`, `position`, `image`, `quote`, `created_at`, `updated_at`) VALUES
(1, 'John Smith', 'CEO at TechCorp', '/src/assets/images/client1.jpg', 'This platform has revolutionized how we handle our crypto investments.', '2025-01-21 10:53:41', '2025-01-21 10:53:41'),
(2, 'Sarah Johnson', 'Financial Analyst', '/src/assets/images/client2.jpg', 'The best crypto trading platform I\'ve ever used. Simple yet powerful.', '2025-01-21 10:53:41', '2025-01-21 10:53:41'),
(3, 'Zen Court', 'Investment Manager', '/src/assets/images/client1.jpg', 'Outstanding service and incredible user experience.', '2025-01-21 10:53:41', '2025-01-21 10:53:41'),
(4, 'Mike Wilson', 'Investment Manager', '/src/assets/images/client2.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.', '2025-01-21 10:53:41', '2025-01-21 10:53:41'),
(5, 'Mike Wilson', 'Investment Manager', '/src/assets/images/client2.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.', '2025-01-21 11:20:21', '2025-01-21 11:20:21'),
(6, 'Mike Wilson', 'Investment Manager', '/src/assets/images/client2.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.', '2025-01-23 11:27:44', '2025-01-23 11:27:44'),
(7, 'Mike Wilson', 'Investment Manager', '/src/assets/images/client2.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.', '2025-01-23 11:27:46', '2025-01-23 11:27:46'),
(8, 'Mike Wilson', 'Investment Manager', '/src/assets/images/client2.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.', '2025-01-23 11:27:46', '2025-01-23 11:27:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `money` int(11) DEFAULT 100
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`, `updated_at`, `money`) VALUES
(1, 'user1', 'mail@mail', '12345678', '2025-01-20 15:14:23', '2025-01-22 15:06:08', 100),
(2, 'john', 'abc@abc', '123456789', '2025-01-20 15:27:48', '2025-01-22 19:43:25', 100),
(3, 'john', 'mail@mail1', '1234567890', '2025-01-20 15:29:10', '2025-01-22 15:06:08', 100),
(4, 'john', 'test01@a2works.biz', '123456789', '2025-01-20 15:29:40', '2025-01-22 15:06:08', 100),
(5, 'john', 'test01@a2works.bizz', '123456789', '2025-01-20 15:30:07', '2025-01-22 15:06:08', 100),
(6, 'john', 'test01@a2works.bizzz', '123456789', '2025-01-20 15:30:49', '2025-01-22 15:06:08', 100),
(7, 'john', 'test01@a2work', '123456789', '2025-01-20 15:31:30', '2025-01-22 15:06:08', 100),
(8, 'john', '1234567@1245436', '123456789', '2025-01-20 15:31:54', '2025-01-22 15:06:08', 100),
(9, 'admin@', '1234567@124543622', '123456789', '2025-01-20 15:40:45', '2025-01-22 15:06:08', 100),
(10, 'john2', 'admin@adman', '123456789', '2025-01-21 10:44:48', '2025-01-22 15:06:08', 100),
(11, 'peter', 'p@com', '12345678', '2025-01-22 19:41:50', '2025-01-22 19:45:34', 101),
(12, 'wall', 'w@com', '12345678', '2025-01-22 19:46:03', '2025-01-22 20:17:32', 99879),
(13, 'stalin', 's@com', '123456789', '2025-01-22 20:17:49', '2025-01-22 20:18:13', 100),
(14, 'gadik', 'g@com', '123456789', '2025-01-22 20:19:28', '2025-01-22 20:19:28', 100),
(15, 'b', 'b@com', '123456789', '2025-01-22 20:20:24', '2025-01-22 20:29:25', 95),
(16, 'ivan', 'i@com', '12345678', '2025-01-23 11:28:38', '2025-01-23 12:32:36', 850);

-- --------------------------------------------------------

--
-- Table structure for table `user_purchases`
--

CREATE TABLE `user_purchases` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `crypto_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `purchase_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_purchases`
--

INSERT INTO `user_purchases` (`id`, `user_id`, `crypto_name`, `price`, `purchase_date`) VALUES
(1, 1, 'Bitcoin', 35000.00, '2025-01-21 14:12:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cryptos`
--
ALTER TABLE `cryptos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crypto_transactions`
--
ALTER TABLE `crypto_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `crypto_id` (`crypto_id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_purchases`
--
ALTER TABLE `user_purchases`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cryptos`
--
ALTER TABLE `cryptos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `crypto_transactions`
--
ALTER TABLE `crypto_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_purchases`
--
ALTER TABLE `user_purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `crypto_transactions`
--
ALTER TABLE `crypto_transactions`
  ADD CONSTRAINT `crypto_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crypto_transactions_ibfk_2` FOREIGN KEY (`crypto_id`) REFERENCES `cryptos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
