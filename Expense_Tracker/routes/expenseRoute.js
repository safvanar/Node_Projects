const express = require('express')

const expenseController = require('../controllers/expenseController')

const authenticate = require('../middlewares/auth')

const router = express.Router()

// router.get('/expenses', expenseController.getExpenses)
router.post('/add-expense', expenseController.postAddExpense)

router.delete('/delete-expense/:expenseId', expenseController.deleteExpense)

router.put('/edit-expense', expenseController.getEditExpense)

router.get('/get-expenses', authenticate, expenseController.getExpenses)

router.get('/get-expense/:expId', expenseController.getExpense)

module.exports = router