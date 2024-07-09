const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();


router.get('/', (req, res) => {
    const products = [];
    const { size } = req.query;
    const limit = size || 10;
    for (let index = 0; index < limit; index++) {
       products.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
       }); 
    }; 
    res.json(products);
});

router.get ('/filter', (req, res) => {
    res.send('Hola soy un filtro')
});

// selección de parametros en espefico (en este caso id)
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json(
        {
            id : id,
            name: 'Product 1',
            price: 3000
        }
    );
});

router.post('/', (req, res) => {
    const body = req.body;
    res.json ({
        message: "created",
        data: body
    })
});

module.exports = router;