USE floreria;

CREATE TABLE cliente(
    idCliente INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    lastName varchar(150) NOT NULL,
    secondName varchar(150) NOT NULL,
    phone varchar(150) NOT NULL,
    address varchar(150) NOT NULL,
    CONSTRAINT pk_cliente_id PRIMARY KEY(idCliente)
   
);

CREATE TABLE rol(
	idRol TINYINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    CONSTRAINT pk_rol_id PRIMARY KEY(idRol)
);

CREATE TABLE usuario(
    idUser INT NOT NULL AUTO_INCREMENT ,
    usuario VARCHAR(150) NOT NULL,
    password varchar(150) NOT NULL,
    dateCreated datetime NOT NULL,
    status TINYINT(21),
    rol TINYINT NOT NULL,
    idCliente INT NOT NULL,
    CONSTRAINT pk_usuario_id PRIMARY KEY(idUser),
    FOREIGN KEY (idCliente) REFERENCES cliente(idCliente),
    FOREIGN KEY (rol) REFERENCES rol(idRol)
   
);


CREATE TABLE arreglo (
    idArreglo INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL, 
    description VARCHAR(150) NOT NULL,
    price DOUBLE(11,2) NOT NULL,
    status TINYINT NOT NULL,
    quantity INT NOT NULL,
    imagen LONGBLOB NOT NULL,
    
    CONSTRAINT pk_arreglo_id PRIMARY KEY(idArreglo)

);

CREATE TABLE pedido (
	
    idPedido int(11) NOT NULL AUTO_INCREMENT,
    status tinyint(4) NOT NULL,
    orderDate datetime DEFAULT NULL,
    deadLine date DEFAULT NULL,
    place varchar(200) DEFAULT NULL,
    precio double DEFAULT NULL,
    idUser int(11) NOT NULL,
    idArreglo int(11) NOT NULL
    
    CONSTRAINT pk_pedido_id PRIMARY KEY (idPedido),
    FOREIGN KEY (idUser) REFERENCES usuario(idUser),
    FOREIGN KEY (idArreglo) REFERENCES arreglo(idArreglo)
);