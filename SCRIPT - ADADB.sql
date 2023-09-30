CREATE DATABASE IF NOT EXISTS adadb;

USE adadb;

CREATE TABLE categoria
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    descricao VARCHAR(200)
);

CREATE TABLE status_item
(
    id INT PRIMARY KEY,
    status VARCHAR(50),
    descricao CHAR(150)
);

CREATE TABLE tipo_admin
(
    id INT PRIMARY KEY,
    tipo VARCHAR(50),
    descricao CHAR(150)
);

CREATE TABLE logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    evento VARCHAR(100),
    descricao TEXT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuario
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150),
    email VARCHAR(150) UNIQUE,
    senha VARCHAR(150),
    cliente INT,
    vendedor INT,
    dt_criacao varchar(30),
    admin INT,
    dt_admin VARCHAR(30),
    tipo_admin INT,
    ativo INT,
    FOREIGN KEY (tipo_admin) REFERENCES tipo_admin(id)
);

CREATE TABLE itens
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200),
    id_categoria INT,
    preco FLOAT,
    descricao VARCHAR(500),
    status INT,
    dt_edicao VARCHAR(30),
    periodicidade INT,
    id_vendedor INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id),
    FOREIGN KEY (status) REFERENCES status_item(id),
    FOREIGN KEY (id_vendedor) REFERENCES usuario(id)
);

CREATE TABLE transacoes
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_comprador INT,
    id_vendedor INT,
    id_item INT,
    dt_transacao VARCHAR(30),
    valor FLOAT,
    FOREIGN KEY (id_comprador) REFERENCES usuario(id),
    FOREIGN KEY (id_vendedor) REFERENCES usuario(id),
    FOREIGN KEY (id_item) REFERENCES itens(id)
);

-- Populando as tabelas categoria, status_item, status_usuario e tipo_usuario
INSERT INTO categoria (nome, descricao) VALUES
    ('Livros', 'Categoria de livros.'),
    ('Revistas', 'Categoria de revistas.'),
    ('Periódicos', 'Categoria de periódicos.'),
    ('Jornais', 'Categoria de jornais.');

INSERT INTO status_item (id, status, descricao) VALUES
    (1, 'Ativo', 'Item está ativo e em estoque.'),
    (2, 'Inativo', 'Item não está disponível.');


DELIMITER //

CREATE TRIGGER usuario_after_insert
AFTER INSERT ON usuario
FOR EACH ROW
BEGIN
    DECLARE log_evento VARCHAR(100);
    DECLARE log_descricao TEXT;

    SET log_evento = 'Novo usuário criado';
    SET log_descricao = CONCAT('Usuário ', NEW.nome, ' foi criado com o email ', NEW.email);

    INSERT INTO logs (evento, descricao) VALUES (log_evento, log_descricao);
END;
//


CREATE TRIGGER usuario_after_update
AFTER UPDATE ON usuario
FOR EACH ROW
BEGIN
    DECLARE log_evento VARCHAR(100);
    DECLARE log_descricao TEXT;

    IF NEW.ativo = '0' THEN
        SET log_evento = 'Usuário desativado';
        SET log_descricao = CONCAT('Usuário ', NEW.nome, ' foi desativado.');

        INSERT INTO logs (evento, descricao) VALUES (log_evento, log_descricao);
    END IF;
END;

DELIMITER ;

DELIMITER //

CREATE TRIGGER usuario_before_insert
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    SET NEW.dt_criacao = NOW(); -- Define a data e hora de criação
    set new.ativo = 1;
END;
//

DELIMITER ;

