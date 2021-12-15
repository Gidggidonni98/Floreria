USE floreria;

CREATE TABLE cliente(
    idCliente BIGINT AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    lastName varchar(150) NOT NULL,
    secondName varchar(150) NOT NULL,
    phone varchar(150) NOT NULL,
    address varchar(150) NOT NULL,
    CONSTRAINT pk_cliente_id PRIMARY KEY(idCliente)
   
);

CREATE TABLE rol(
	idRol TINYINT AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    CONSTRAINT pk_rol_id PRIMARY KEY(idRol)
);

CREATE TABLE usuario(
    idUser BIGINT AUTO_INCREMENT,
    usuario VARCHAR(150) NOT NULL,
    password varchar(150) NOT NULL,
    dateCreated datetime NOT NULL,
    status TINYINT(21),
    rol TINYINT NOT NULL,
    idCliente BIGINT NOT NULL,
    CONSTRAINT pk_usuario_id PRIMARY KEY(idUser),
    FOREIGN KEY (idCliente) REFERENCES cliente(idCliente),
    FOREIGN KEY (rol) REFERENCES rol(idRol)
   
);

CREATE TABLE categoria(
	idCategoria BIGINT AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    CONSTRAINT pk_cateogoria_id PRIMARY KEY(idCategoria)
);

CREATE TABLE arreglo (
    idArreglo BIGINT AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL, 
    description VARCHAR(150) NOT NULL,
    price DECIMAL(2) NOT NULL,
    status TINYINT NOT NULL,
    quantity INT NOT NULL,
    idCategoria BIGINT NOT NULL,
    
    CONSTRAINT pk_arreglo_id PRIMARY KEY(idArreglo),
    FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria)
);

CREATE TABLE pedido (
	idPedido BIGINT AUTO_INCREMENT,
    status TINYINT NOT NULL,
    idUser BIGINT NOT NULL,
    idArreglo BIGINT NOT NULL,
    
    CONSTRAINT pk_pedido_id PRIMARY KEY (idPedido),
    FOREIGN KEY (idUser) REFERENCES usuario(idUser),
    FOREIGN KEY (idArreglo) REFERENCES arreglo(idArreglo)
);