const bodyParser = require('body-parser')

const Expense = require('../models/expenseModel')

const User = require('../models/users')

exports.postAddExpense = async (req, res, next) => {
    try{
        const userId = req.body.userId
        const amount = req.body.expenseAmount
        const title = req.body.expenseTitle
        const category = req.body.expenseCategory

        console.log("user: " + userId)
        await Expense.create({
            title: title,
            amount: amount,
            category: category,
            userId: userId
        })
        res.status(201).redirect('/')
    }catch(err){
        res.status(500).json({message: 'server side error'})
    } 
}

exports.getExpenses = (req, res, next) => {
    Expense.findAll()
        .then(expenses => {
            res.status(200).json({ expenses: expenses})
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getEditExpense = (req, res, next) => {
    const expId = req.params.expenseId
    Expense.findByPk(expId)
        .then(expense => {
            return expense.destroy()
        })
        .then(result => {
            res.redirect('/get-expenses')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteExpense = (req, res, next) => {
    const expId = req.params.expenseId
    Expense.findByPk(expId)
        .then(expense => {
            return expense.destroy()
        })
        .then(result => {
            res.redirect('/get-expenses')
        })
        .catch(err => {
            console.log(err)
        })
}