-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jun 12, 2025 at 10:50 AM
-- Server version: 8.0.42
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `investql`
--

-- --------------------------------------------------------

--
-- Table structure for table `activos`
--

CREATE TABLE `activos` (
  `id_activo` bigint NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cartera`
--

CREATE TABLE `cartera` (
  `id_cartera` int NOT NULL,
  `id_usuario` int NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cartera_activos`
--

CREATE TABLE `cartera_activos` (
  `id` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  `id_activo` bigint NOT NULL,
  `cantidad` decimal(38,2) DEFAULT NULL,
  `precio_compra` decimal(38,2) DEFAULT NULL,
  `fecha_compra` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transacciones`
--

CREATE TABLE `transacciones` (
  `id_transaccion` int NOT NULL,
  `id_cartera` int NOT NULL,
  `id_activo` int NOT NULL,
  `tipo` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `cantidad` decimal(10,0) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` bigint NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contraseña_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `horizonte_inversion` int DEFAULT NULL,
  `nivel_riesgo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `contraseña_hash`, `fecha_registro`, `horizonte_inversion`, `nivel_riesgo`) VALUES
(999, 'admin', 'admin@gmail.com', 'admin', NULL, NULL, NULL),

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activos`
--
ALTER TABLE `activos`
  ADD PRIMARY KEY (`id_activo`);

--
-- Indexes for table `cartera`
--
ALTER TABLE `cartera`
  ADD PRIMARY KEY (`id_cartera`);

--
-- Indexes for table `cartera_activos`
--
ALTER TABLE `cartera_activos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cartera_activo` (`id_activo`),
  ADD KEY `fk_cartera_usuario` (`id_usuario`);

--
-- Indexes for table `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`id_transaccion`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartera_activos`
--
ALTER TABLE `cartera_activos`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartera_activos`
--
ALTER TABLE `cartera_activos`
  ADD CONSTRAINT `fk_cartera_activo` FOREIGN KEY (`id_activo`) REFERENCES `activos` (`id_activo`),
  ADD CONSTRAINT `fk_cartera_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
