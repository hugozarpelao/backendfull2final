CREATE SCHEMA trabalho_final;

USE trabalho_final;

CREATE TABLE candidatos (
    can_cpf VARCHAR(20) NOT NULL PRIMARY KEY,
    can_nome VARCHAR(100) NOT NULL,
    can_ctps INT(20) NOT NULL,
    can_datanasc DATE NOT NULL,
    can_endereco VARCHAR(100) NOT NULL,
    can_bairro VARCHAR(30) NOT NULL,
    can_municipio VARCHAR(30) NOT NULL,
    can_cep VARCHAR(30) NOT NULL,
    can_telefone VARCHAR(30) NOT NULL,
    can_email VARCHAR(30) NOT NULL,
    can_escolaridade VARCHAR(30) NOT NULL
);

CREATE TABLE vaga (
    vag_codigo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    vag_cargo VARCHAR(30) NOT NULL,
    vag_salario VARCHAR(10) NOT NULL,
    vag_cidade VARCHAR(20) NOT NULL,
    vag_quantidade INT NOT NULL,
    vag_requisitos VARCHAR(150) NOT NULL
);

CREATE TABLE candidato_vaga (
    canvag_codigo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    canvag_horario DATETIME NOT NULL,
    canvag_can_cpf VARCHAR(20) NOT NULL,
    canvag_vag_codigo INT NOT NULL,
    CONSTRAINT fk_candidato FOREIGN KEY (canvag_can_cpf)
    REFERENCES candidatos(can_cpf),
    CONSTRAINT fk_vaga FOREIGN KEY (canvag_vag_codigo)
    REFERENCES vaga(vag_codigo)
);