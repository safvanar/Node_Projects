const express = require('express')

const successController = require('../controllers/successcontroller')

const router = express.Router()

router.use('/success', successController.successController)

module.exports = router