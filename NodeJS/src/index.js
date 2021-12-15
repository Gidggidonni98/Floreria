const express = require('express');
const morgan = require('morgan');

//ininicializaciones
const app = express();

//settings
app.set('port', process.env.PORT || 5000);

//Middelware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//routes
app.use(require('./routes/index.js'));
app.use('/cliente', require('./routes/cliente.js'));
app.use('/usuario', require('./routes/usuario.js'));
app.use('/producto', require('./routes/producto.js'));
app.use('/pedido', require('./routes/pedido.js'));

// 


//starting server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});