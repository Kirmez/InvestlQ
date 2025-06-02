DROP DATABASE IF EXISTS investql;
CREATE DATABASE investql CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE investql;

-- --------------------------------------------------------
-- Tabla de activos
-- --------------------------------------------------------
CREATE TABLE activos (
  id_activo BIGINT NOT NULL,
  nombre VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id_activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Tabla de usuarios
-- --------------------------------------------------------
CREATE TABLE usuarios (
  id_usuario BIGINT NOT NULL,
  nombre VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  contraseña_hash VARCHAR(255) NOT NULL,
  fecha_registro DATETIME(6) DEFAULT NULL,
  horizonte_inversion INT DEFAULT NULL,
  nivel_riesgo VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Tabla de cartera_activos
-- --------------------------------------------------------
CREATE TABLE cartera_activos (
  id BIGINT NOT NULL AUTO_INCREMENT,
  id_activo BIGINT NOT NULL,
  cantidad DECIMAL(38,2) DEFAULT NULL,
  precio_compra DECIMAL(38,2) DEFAULT NULL,
  fecha_compra DATE NOT NULL,
  id_usuario BIGINT NOT NULL,
  PRIMARY KEY (id),
  KEY fk_cartera_usuario (id_usuario),
  KEY fk_cartera_activo (id_activo),
  CONSTRAINT fk_cartera_activo FOREIGN KEY (id_activo) REFERENCES activos (id_activo),
  CONSTRAINT fk_cartera_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Tabla de transacciones (opcional)
-- --------------------------------------------------------
CREATE TABLE transacciones (
  id_transaccion INT NOT NULL AUTO_INCREMENT,
  id_usuario BIGINT NOT NULL,
  id_activo BIGINT NOT NULL,
  tipo VARCHAR(10) NOT NULL,        -- 'buy' o 'sell'
  cantidad DECIMAL(10,2) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  fecha DATE NOT NULL,
  PRIMARY KEY (id_transaccion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Datos de prueba
-- --------------------------------------------------------

INSERT INTO activos (id_activo, nombre) VALUES
  (1, 'InvestIQ'),
  (2, 'CryptoX'),
  (3, 'GreenFund'),
  (4, 'Energy ETF'),
  (5, 'BondPro'),
  (111, 'accion'),
  (222, 'bono'),
  (333, 'ETF'),
  (444, 'crypto');
