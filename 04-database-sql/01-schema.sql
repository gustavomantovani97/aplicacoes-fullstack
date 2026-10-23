
CREATE DATABASE IF NOT EXISTS desafio CHARACTER SET utf8mb4;
USE desafio;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_created_at (created_at)
);