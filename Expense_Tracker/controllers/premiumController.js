const bodyParser = require('body-parser')
const User = require('../models/users')
const Expense = require('../models/expenseModel')
const sequelize = require('../utils/database')

exports.getLeaderBoard = async (req, res, next) => {
    try{
        const users = await User.findAll({attributes: ['name', 'totalSpending'], order: [['totalSpending', 'DESC']]})
        res.status(201).json({users: users, message: 'succesful!'})
    }catch(err){
        console.log(err)
        res.status(403).json({message: 'Error fetching leader board!'})
    }
}

// exports.getLeaderBoard = async (req, res, next) => {
//     try{
//         const leaderBoard = await User.findAll({
//             attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'totalSpending']],
//             include: [{
//                 model: Expense,
//                 attributes: []
//             }],
//             group: ['user.id'],
//             order: [['totalSpending', 'DESC']]
//     })
//     res.status(201).json(leaderBoard) 
//     }catch(err){
//         console.log(err)
//         res.status(403).json({message: 'Error fetching leader board!'})
//     }
// }