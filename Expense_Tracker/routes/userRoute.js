const express = require('express')

const userController = require('../controllers/userController')

const userAuthentication = require('../middlewares/auth')

const router = express.Router()

// router.get('/expenses', expenseController.getExpenses)
router.post('/login', userController.checkUser)

router.post('/signup', userController.createUser)

router.get('/getStatus', userAuthentication, userController.getUserStatus)

module.exports = router