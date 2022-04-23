const express = require('express');
const router = express.Router();
const pool = require('../database.js');

// //GET ALL CLIENTS
router.get('/', async(req, res) => {
    let listClientes = await pool.query('SELECT cliente.idCliente, cliente.name, cliente.lastName, cliente.secondName, cliente.phone, cliente.address, usuario.usuario, usuario.dateCreated, usuario.status, usuario.rol FROM cliente CROSS JOIN usuario WHERE cliente.idCliente = usuario.idUser;');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listClientes: listClientes
    });
});

// //GET CLIENT BY ID

// router.get('/:id', async(req, res) => {
//     const { id } = req.params;
//     let cliente = await pool.query('SELECT cliente.*, usuario.usuario, usuario.dateCreated, usuario.status, usuario.rol FROM cliente LEFT JOIN usuario ON usuario.idCliente = cliente.idCliente WHERE cliente.idCliente = ?;', [id]);
//     res.json({
//         status: 200,
//         message: "Se ha encontrado el cliente",
//         cliente: cliente
//     });
// });


// // CREATE A CLIENT

router.post('/create', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let { name, lastName, secondName, phone, address } = req.body;
    const insertCliente = { name, lastName, secondName, phone, address };
    clienteInsert = await pool.query('INSERT INTO cliente set ?', [insertCliente]);
    const { insertId } = clienteInsert;
    const idCliente = insertId;

    const { usuario, password } = req.body;
    var date = new Date().toISOString();

    const usuario3 = { usuario, password, dateCreated: date, status: 1, rol: 2, idCliente };
    let userInsert = await pool.query('INSERT INTO usuario set ?', [usuario3]);

    res.json({
        status: "200",
        message: "Se ha registrado correctamente",
        cliente: clienteInsert,
        usuario: userInsert
    });
});

// // UPDATE CLIENT

router.post('/update/:id', async(req, res) => {
    const { id } = req.params;
    const { name, lastName, secondName, phone, address } = req.body;
    const cliente = {
        name,
        lastName,
        secondName,
        phone,
        address
    };
    await pool.query('UPDATE cliente SET ? WHERE idCliente = ?', [cliente, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado",
        cliente: cliente
    });
});
router.post('/login/', async (req, res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    let { email, password } = req.body;

    let user = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [email]);
    if(user.hasOwnProperty(0)){
        let idUser   = user[0].idUser;
        let contra = user[0].password;
        let name = await pool.query('SELECT name FROM cliente WHERE idCliente = ?', [idUser]);
        let nameSurname = `${name[0].name}`;
        let idRol = `${user[0].rol}`
        if(password == contra ){
            res.json({
                status: "200",
                message : "Success",
                roleUser : idRol,
                name: nameSurname
            });
        }else if(password === ""){
            
            res.json({
                status: "500",
                message: "No"
                
            });
            
        }else{
           
            res.json({
                status: "500",
                message: "Invalid password or email"   
            })
        }

    }else{
        res.json({
            status: "500",
            message: "No"
        });
    }
})

module.exports = router;