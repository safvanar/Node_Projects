const bodyParser = require('body-parser')
const User = require('../models/users')

exports.checkUser = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    
    const user = await User.findOne({where: {email: email, password: password}})
    if(user){
        res.status(200).json({login: 'success'})
    }
    else{
        res.status(200).json({login: 'authentication failed'})
    }
}