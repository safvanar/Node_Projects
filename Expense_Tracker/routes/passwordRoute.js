const express = require('express')

const passwordController = require('../controllers/passwordController')

const router = express.Router()

// router.get('/expenses', expenseController.getExpenses)
router.post('/resetPassword', passwordController.resetPassword)

module.exports = router