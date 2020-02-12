-- MySQL Script generated by MySQL Workbench
-- Fri Jan  4 19:05:17 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema db_coleta
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_coleta
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_coleta` DEFAULT CHARACTER SET utf8 ;
USE `db_coleta` ;

-- -----------------------------------------------------
-- Table `db_coleta`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_coleta`.`Usuario` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `visibilidadeEmail` INT(1) NOT NULL DEFAULT 2,
  `senha` VARCHAR(20) NOT NULL,
  `telefone` VARCHAR(14) NULL,
  `celular` VARCHAR(11) NULL,
  `visibilidadeTelefones` INT(1) NOT NULL DEFAULT 2,
  `visibilidadeImagem` INT(1) NOT NULL DEFAULT 1,
  `dataNascimento` DATE NULL,
  `visibilidadeDataNascimento` INT(1) NOT NULL DEFAULT 2,
  `tipoUsuario` INT(1) NOT NULL DEFAULT 1,
  `tokenFacebook` VARCHAR(64) NULL,
  `tokenGoogle` VARCHAR(64) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = big5;


-- -----------------------------------------------------
-- Table `db_coleta`.`Pais`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_coleta`.`Pais` (
  `id` INT NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `sigla` VARCHAR(3) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_coleta`.`Estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_coleta`.`Estado` (
  `id` INT NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `sigla` VARCHAR(2) NULL,
  `Pais_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Pais_id`),
  INDEX `fk_Estado_Pais1_idx` (`Pais_id` ASC),
  CONSTRAINT `fk_Estado_Pais1`
    FOREIGN KEY (`Pais_id`)
    REFERENCES `db_coleta`.`Pais` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_coleta`.`Municipio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_coleta`.`Municipio` (
  `id` INT NOT NULL,
  `nome` VARCHAR(50) NULL,
  `Estado_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Estado_id`),
  INDEX `fk_Municipio_Estado1_idx` (`Estado_id` ASC),
  CONSTRAINT `fk_Municipio_Estado1`
    FOREIGN KEY (`Estado_id`)
    REFERENCES `db_coleta`.`Estado` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_coleta`.`Endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_coleta`.`Endereco` (
  `Usuario_id` INT UNSIGNED NOT NULL,
  `logradouro` VARCHAR(80) NULL,
  `numero` INT NULL,
  `bairro` VARCHAR(50) NULL,
  `municipio` INT NULL,
  `visibilidadeMunicipio` INT(1) NOT NULL DEFAULT 2,
  `visibilidadeEstado` INT(1) NOT NULL DEFAULT 1,
  `visibilidadePais` INT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Usuario_id`),
  INDEX `fk_Endereco_Municipio1_idx` (`municipio` ASC),
  INDEX `fk_Endereco_Usuário1_idx` (`Usuario_id` ASC),
  CONSTRAINT `fk_Endereco_Municipio1`
    FOREIGN KEY (`municipio`)
    REFERENCES `db_coleta`.`Municipio` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Endereco_Usuário1`
    FOREIGN KEY (`Usuario_id`)
    REFERENCES `db_coleta`.`Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_coleta`.`Local`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_coleta`.`Local` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rotulo` VARCHAR(200) NOT NULL,
  `longitude` FLOAT NOT NULL,
  `latitude` FLOAT NOT NULL,
  `tipoLocal` INT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `rotulo_UNIQUE` (`rotulo` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_coleta`.`Coleta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_coleta`.`Coleta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Local_id` INT NOT NULL,
  `diaSemana` INT(1) NOT NULL,
  `tipoLixo` INT(1) NOT NULL,
  `turno` INT(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Coleta_Local1_idx` (`Local_id` ASC),
  CONSTRAINT `fk_Coleta_Local1`
    FOREIGN KEY (`Local_id`)
    REFERENCES `db_coleta`.`Local` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_coleta`.`Rota`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_coleta`.`Rota` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_coleta`.`Rota_has_Local`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_coleta`.`Rota_has_Local` (
  `Rota_id` INT NOT NULL,
  `Local_id` INT NOT NULL,
  PRIMARY KEY (`Rota_id`, `Local_id`),
  INDEX `fk_Rota_has_Local_Local1_idx` (`Local_id` ASC),
  INDEX `fk_Rota_has_Local_Rota1_idx` (`Rota_id` ASC),
  CONSTRAINT `fk_Rota_has_Local_Rota1`
    FOREIGN KEY (`Rota_id`)
    REFERENCES `db_coleta`.`Rota` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Rota_has_Local_Local1`
    FOREIGN KEY (`Local_id`)
    REFERENCES `db_coleta`.`Local` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;