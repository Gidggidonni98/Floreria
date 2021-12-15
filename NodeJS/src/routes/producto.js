const express = require('express');
const router = express.Router();
const pool = require('../database.js');

// //GET ALL Products
router.get('/', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let listProducto = await pool.query('SELECT * FROM arreglo');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listProducto: listProducto
    });
});

router.get('/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;
    let arreglo = await pool.query('Select * from arreglo where idArreglo = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        arreglo: arreglo
    });
});

router.post('/create', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { name, description, price, quantity, imagen } = req.body;
    const arreglo = {
        name,
        description,
        price,
        status: 1,
        quantity,
        imagen
    };
    await pool.query('INSERT INTO arreglo SET ? ', [arreglo]);
    res.json({
        status: 200,
        message: "Se ha creado correctamente",
        arreglo: arreglo
    });
});

router.post('/update/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const arreglo = {
        name,
        description,
        price,
        quantity
    };

    await pool.query('UPDATE arreglo set ? where idArreglo = ?', [arreglo, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        arreglo: arreglo
    });
});

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    pool.query('UPDATE arreglo SET status = 0 WHERE idArreglo = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
})

module.exports = router;