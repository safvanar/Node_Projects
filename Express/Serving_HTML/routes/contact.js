const express = require('express')

const router = express.Router()

const contactController = require('../controllers/contactus')

router.get('/contact', contactController.contactController)

module.exports = router