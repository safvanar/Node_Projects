const express = require('express')

const expenseController = require('../controllers/expenseController')

const router = express.Router()

// router.get('/expenses', expenseController.getExpenses)
router.post('/add-expense', expenseController.postAddExpense)

router.delete('/delete-expense/:expenseId', expenseController.deleteExpense)

router.get('/edit-expenses/:expenseId', expenseController.getEditExpense)

router.get('/get-expenses', expenseController.getExpenses)

module.exports = router