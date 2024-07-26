// Vamos a hacer el llamado a express para poder utilizarlo, como constructo o método
const express = require('express');

// Hacemos uso de la libreria para el manejo de CORS
const cors = require('cors');

// Hacemos el llamado para usar faker
// const { faker } = require('@faker-js/faker');

// Vamos a importar la funcion, en la cual trabajamos con las rutas
const routerApi = require('./routes');

// Vamos a crear la app por medio de express
const app = express();

// Vamos a determinar la ruta para que corra la app
const port = 3000;

// importamos los middlewares
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');
// const { required } = require('joi');

// Le decimos a espress que use un middleware nativo, para poder hacer post
app.use(express.json());
// app.use(cors());

const whitelist = ['http://localhost:5501'];
const options = {
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
            return;
        } 
        const host = new URL(origin).origin;

        if (whitelist.includes(host)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    }
};
app.use(cors(options));

/*
Vamos a definir la ruta(que va a ser esta misma carpeta), con un callback que va a ejecutar la respuesta que nosotros enviemos a nuestro cliente

en el CB tenemos 2 parametros, "req" y "res"
*/

app.get('/api', (req, res) => {
    res.send('Hi, this is my server using Express');
});

// selección de varios parámetros de url

app.get('/api/categories/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json(
        {
            categoryId,
            productId
        }
    );
});

 
/* 
Ahora debemos indicar en que puerto va a correr esto, para poder visualizar
Tambien es posible agregar una función, para que esta nos este indicando que funciona, como sería el ejemplo de un console.log
*/
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Mi Port es:' + port);
});
