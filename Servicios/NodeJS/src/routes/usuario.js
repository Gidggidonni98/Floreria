const express = require('express');
const router = express.Router();
const pool = require('../database.js');


//GET A USER BY ID

// router.get('/:id', async(req, res) =>{
//     const { id } = req.params;
//     let usuario = await pool.query('SELECT * FROM usuario WHERE idUser = ?', [id]);
//     res.json({
//         status: 200,
//         message: "Se ha encontrado el usuario",
//         usuario : usuario
//     });
// });



//UPDATE A USER

router.post('/update/:id', async(req,res) =>{
    const { id } = req.params;
    const { usuario, password } = req.params;
    const usuario2 = {
        usuario, password
    };
    await pool.query('UPDATE usuario SET ? WHERE idUser = ?', [usuario, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        usuario: usuario2
    });
});

// DESACTIVATE A USER

router.post('/delete/:id', async(req,res) =>{
    const { id } = req.params;
    pool.query('UPDATE usuario SET status = 0 WHERE idUser = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha desactivado correctamente"
    });
});



module.exports = router;
