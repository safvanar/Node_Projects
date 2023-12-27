const express = require('express')

const userController = require('../controllers/userController')

const router = express.Router()

// router.get('/expenses', expenseController.getExpenses)
router.post('/login', userController.checkUser)

router.post('/signup', userController.createUser)

module.exports = router