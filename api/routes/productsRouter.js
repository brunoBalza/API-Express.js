const express = require('express');
const productsServices = require('./../services/productsServices');
const { validatorHandler } = require('./../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema }= require('./../schema/productSchema');
const router = express.Router();
const service = new productsServices();

router.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
});

router.get ('/filter', (req, res) => {
    res.send('Hola soy un filtro')
});

// selección de parametros en espefico (en este caso id)
router.get('/:id', 
    validatorHandler(getProductSchema,'params'),
    async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.findOne(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.post('/', 
    validatorHandler(createProductSchema, 'body'),
    async(req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.json(newProduct);
});


router.patch('/:id', 
    validatorHandler(getProductSchema,'params'),
    validatorHandler(updateProductSchema, 'body'),
    async(req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
});

module.exports = router;