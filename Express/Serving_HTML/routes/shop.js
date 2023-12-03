const express = require('express')

const productController = require('../controllers/product')
//import { getProducts } from '../controllers/product'

//then use getProducts instead of productController.getProducts in line no.10

const router = express.Router()

router.get('/', productController.getProducts)

module.exports = router