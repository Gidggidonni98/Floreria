const express = require('express');
const router = express.Router();
const pool = require('../database.js');

//Obtener todos los pedidos de un usuario


router.get('/user/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;
    let arreglo = await pool.query('Select * from pedido where idUser = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        arreglo: arreglo
    });
});

//obtener todos los pedidos

router.get('/', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let listPedidos = await pool.query('SELECT * FROM pedido');
    res.json({
        status: 200,
        message: "Se listaron correctamente",
        listPedidos: listPedidos
    });
});

//ENCONTRAR POR ID

router.get('/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;
    let pedido = await pool.query('SELECT * FROM pedido WHERE idPedido = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el pedido",
        pedido: pedido
    });
});

//CREAR UN PEDIDO

router.post('/create', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { place, price, idUser, idArreglo } = req.body;
    var date = new Date().toISOString();
    let tmp = new Date(date);
    let suma = 5 * 86399.9;
    let date2 = new Date(tmp.setSeconds(suma));
    const pedido = {
        status: 2,
        orderDate: date,
        deadLine: date2,
        place,
        price,
        idUser,
        idArreglo
    };
    let pedidoInsert = await pool.query('INSERT INTO pedido SET ?', [pedido]);
    res.json({
        status: 200,
        message: "Se ha creado correctamente",
        pedido: pedidoInsert
    });

});

//ACTUALIZAR PEDIDO

router.post('/enviar/:id', async(req, res) => {
    const { id } = req.params; 

        await pool.query('UPDATE pedido SET status = 2 WHERE idPedido = ?', [id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
            
        
        });
 
});


router.post('/entregado/:id', async(req, res) => {
    const { id } = req.params; 

        await pool.query('UPDATE pedido SET status = 4 WHERE idPedido = ?', [id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
        
        });
 
});

router.post('/entregadoAdmin/:id', async(req, res) => {
    const { id } = req.params; 

        await pool.query('UPDATE pedido SET status = 3 WHERE idPedido = ?', [id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
        
        });
 
});


//BORRAR PEDIDO

router.post('/delete/:id', async(req, res) => {
    const { id } = req.params;
    pool.query('UPDATE pedido SET status = 0 WHERE idPedido = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha desactivado correctamente"
    });
});


module.exports = router;