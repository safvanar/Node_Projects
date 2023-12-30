const bodyParser = require('body-parser')
const User = require('../models/users')

exports.getLeaderBoard = async (req, res, next) => {
    try{
        const users = await User.findAll({attributes: ['name', 'totalSpending'], order: [['totalSpending', 'DESC']]})
        res.status(201).json({users: users, message: 'succesful!'})
    }catch(err){
        console.log(err)
        res.status(403).json({message: 'Error fetching leader board!'})
    }
}