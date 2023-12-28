const bodyParser = require('body-parser')

const Expense = require('../models/expenseModel')

const User = require('../models/users')

exports.postAddExpense = async (req, res, next) => {
    try{
        const userId = req.body.userId
        const amount = req.body.expenseAmount
        const title = req.body.expenseTitle
        const category = req.body.expenseCategory

        if(amount == undefined || amount.length === 0 || title == undefined || title.length ===0){
            return res.status(400).json({message: 'Bad parameters'})
        }

        await Expense.create({
            title: title,
            amount: amount,
            category: category,
            userId: userId
        })
        res.status(201).redirect('/home')
    }catch(err){
        res.status(500).json({message: 'server side error'})
    } 
}

exports.getExpenses = async (req, res, next) => {
    try{
        const expenses = await Expense.findAll({where: { userId: req.user.id}})
        res.status(200).json({ expenses: expenses})
    }catch(err){
        console.log(err)
    }
}

exports.getEditExpense = (req, res, next) => {
    const expId = req.body.expId
    const userId = req.body.userId
    const amount = req.body.expenseAmount
    const title = req.body.expenseTitle
    const category = req.body.expenseCategory 

    console.log("Changes: "+ amount)
    Expense.findByPk(expId)
        .then(expense => {
            expense.amount = amount
            expense.title = title
            expense.category = category
            return expense.save()
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
    console.log("Expense ID: ", expId)
    Expense.findByPk(expId)
        .then(expense => {
            return expense.destroy()
        })
        .then(result => {
            res.redirect('/home')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getExpense = async (req, res, next) => {
    try{
        const expId = req.params.expId
        const expense = await Expense.findByPk(expId)
        res.status(200).json({message: 'successful', expense: expense})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'error fetching the expense'})
    }
}