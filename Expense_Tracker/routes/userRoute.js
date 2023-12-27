const express = require('express')

const loginController = require('../controllers/loginController')

const signupController = require('../controllers/signupController')

const router = express.Router()

// router.get('/expenses', expenseController.getExpenses)
router.post('/login', loginController.checkUser)

router.post('/signup', signupController.createUser)

module.exports = router