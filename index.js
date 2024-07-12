// Vamos a hacer el llamado a express para poder utilizarlo, como constructo o método
const express = require('express');

const { faker } = require('@faker-js/faker');

// Vamos a importar la funcion, en la cual trabajamos con las rutas
const routerApi = require('./routes');

// Vamos a crear la app por medio de express
const app = express();

// Vamos a determinar la ruta para que corra la app
const port = 3000;

// importamos los middlewares
const { logErrors, errorHandler } = require('./middlewares/errorHandler')

// Le decimos a espress que use un middleware nativo, para poder hacer post
app.use(express.json());

/*
Vamos a definir la ruta(que va a ser esta misma carpeta), con un callback que va a ejecutar la respuesta que nosotros enviemos a nuestro cliente

en el CB tenemos 2 parametros, "req" y "res"
*/

app.get('/', (req, res) => {
    res.send('Hi, this is my server using Express');
});

// selección de varios parámetros de url

app.get('/categories/:categoryId/products/:productId', (req, res) => {
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
app.use(errorHandler);

app.listen(port, () => {
    console.log('Mi Port es:' + port);
});
