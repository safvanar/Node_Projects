const bodyParser = require('body-parser')

const Expense = require('../models/expenseModel')

const User = require('../models/users')

exports.postAddExpense = async (req, res, next) => {
    try{
        const user = req.user
        const amount = req.body.expenseAmount
        const title = req.body.expenseTitle
        const category = req.body.expenseCategory

        if(amount == undefined || amount.length === 0 || title == undefined || title.length ===0){
            return res.status(400).json({message: 'Bad parameters'})
        }

        await user.createExpense({
            title: title,
            amount: amount,
            category: category,
        })
        res.status(201).redirect('/home')
    }catch(err){
        res.status(500).json({message: 'server side error'})
    } 
}

exports.getExpenses = async (req, res, next) => {
    try{
        const expenses = await req.user.getExpenses() // -> using magic functions due to the association
        // const expenses = await Expense.findAll({where: { userId: req.user.id}})
        res.status(200).json({ expenses: expenses})
    }catch(err){
        console.log(err)
    }
}

exports.getEditExpense = (req, res, next) => {
    const user = req.user
    const expId = req.body.expId
    const amount = req.body.expenseAmount
    const title = req.body.expenseTitle
    const category = req.body.expenseCategory 

    console.log("Changes: "+ amount)
    Expense.findByPk(expId)
        .then(expense => {
            expense.amount = amount
            expense.title = title
            expense.category = category
            if(expense.userId === user.id){
                return expense.save()
            }else{
                throw new Error('User is not authenticated to edit the expense')
            }
        })
        .then(result => {
            res.redirect('/get-expenses')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteExpense = (req, res, next) => {
    const user = req.user
    const expId = req.params.expenseId
    console.log("Expense ID: ", expId)

    //Expense.destroy({where: {id: expId, userId: user.id}})
    Expense.findByPk(expId)
        .then(expense => {
            if(expense.userId === user.id){
                return expense.destroy()
            }else{
                throw new Error('User is not authorized')
            }
        })
        .then(result => {
            res.redirect('/home')
        })
        .catch(err => {
            console.log(err)
            res.status(403).json({message: 'user is not authorized for deleting other\'s expenses'})
        })
}

exports.getExpense = async (req, res, next) => {
    try{
        const user = req.user
        const expId = req.params.expId
        const expense = await Expense.findByPk(expId)
        if(expense.userId === user.id){
            res.status(200).json({message: 'successful', expense: expense})
        }else{
            throw new Error('User is not authenticated to view')
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'error fetching the expense'})
    }
}