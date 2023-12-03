const express = require('express')

const successController = require('../controllers/successcontroller')

const router = express.Router()

router.use('/success', successController.successPage)

module.exports = router