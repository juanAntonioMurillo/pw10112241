-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2024 at 05:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pwdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `articulos`
--

CREATE TABLE `articulos` (
  `claveArticulo` int(11) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `existencia` int(11) NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articulos`
--

INSERT INTO `articulos` (`claveArticulo`, `descripcion`, `existencia`, `precio`) VALUES
(1, 'torni;os', 2, 10),
(5, 'tuellas', 50, 1300);

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `curp` varchar(18) NOT NULL,
  `cp` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `apellido`, `direccion`, `telefono`, `rfc`, `curp`, `cp`) VALUES
(1, 'LUPTA', 'HERNANDES', 'conocida', '6666666', 'LPHERNANDES', 'LPHERNANDESZHLS', '8111'),
(1, 'LUPTA', 'HERNANDES', 'conocida', '6666666', 'LPHERNANDES', 'LPHERNANDESZHLS', '8111'),
(2, 'juan', 'murillo', 'conocida', '6674250267', 'GOVM860812QA2', 'GORJ860823MJCNMD06', '10800');

-- --------------------------------------------------------

--
-- Table structure for table `detalleventa`
--

CREATE TABLE `detalleventa` (
  `iddetalleVenta` int(11) NOT NULL,
  `clavearticulo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `idvendedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detalleventa`
--

INSERT INTO `detalleventa` (`iddetalleVenta`, `clavearticulo`, `cantidad`, `precio`, `fecha`, `idvendedor`) VALUES
(1, 1, 2, 10, '2024-06-04 04:52:52', 2),
(1, 1, 2, 10, '2024-06-03 20:08:05', 2),
(2, 1, 2, 10, '2024-06-03 20:09:31', 4),
(2, 1, 2, 10, '2024-06-03 20:09:31', 4),
(3, 1, 2, 10, '2024-06-03 20:57:17', 4),
(3, 1, 2, 10, '2024-06-03 20:57:17', 4),
(4, 1, 1, 10, '2024-06-03 20:59:47', 2),
(5, 1, 2, 10, '2024-06-03 23:03:13', 4),
(5, 1, 2, 10, '2024-06-03 23:03:13', 4),
(6, 3, 1, 50, '2024-06-04 19:35:48', 2),
(6, 3, 1, 50, '2024-06-04 19:35:48', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vendedores`
--

CREATE TABLE `vendedores` (
  `idvendedor` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `departamentotienda` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendedores`
--

INSERT INTO `vendedores` (`idvendedor`, `nombre`, `apellido`, `departamentotienda`) VALUES
(1, 'Juan', 'Pérez', 'Electrónica'),
(2, 'Ana', 'López', 'Ropa'),
(4, 'camila', 'alvares', 'airra');

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `claveArticulo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `idVendedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ventas`
--

INSERT INTO `ventas` (`claveArticulo`, `cantidad`, `precio`, `fecha`, `idVendedor`) VALUES
(1, 2, 10, '2024-06-02 23:58:51', 0),
(1, 1, 10, '2024-06-02 23:58:51', 0),
(1, 2, 10, '2024-06-03 00:00:08', 4),
(1, 2, 10, '2024-06-03 00:00:08', 4),
(1, 1, 10, '2024-06-03 00:03:09', 2),
(1, 2, 10, '2024-06-02 17:18:30', 2),
(1, 2, 10, '2024-06-03 20:08:05', 2),
(1, 2, 10, '2024-06-03 20:09:31', 4),
(1, 2, 10, '2024-06-03 20:09:31', 4),
(1, 2, 10, '2024-06-03 20:57:17', 4),
(1, 2, 10, '2024-06-03 20:57:17', 4),
(1, 1, 10, '2024-06-03 20:59:47', 2),
(1, 2, 10, '2024-06-03 23:03:13', 4),
(1, 2, 10, '2024-06-03 23:03:13', 4),
(3, 1, 50, '2024-06-04 19:35:48', 2),
(3, 1, 50, '2024-06-04 19:35:48', 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
