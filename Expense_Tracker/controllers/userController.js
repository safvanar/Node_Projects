const bodyParser = require('body-parser')
const User = require('../models/users')

function isStringEmpty(string){
    if(string == undefined || string.length === 0){
        return true
    }else{
        return false
    }
}

exports.checkUser = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    
    const user = await User.findOne({where: {email: email, password: password}})
    if(user){
        res.status(200).json({login: 'success'})
    }
    else{
        res.status(404).json({login: 'authentication failed'})
    }
}

exports.createUser = async (req, res, next) => {
    try{
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        if(isStringEmpty(name) || isStringEmpty(email) || isStringEmpty(password)){
            return res.status(400).json({message: 'Fill in all fields!'})
        }
        const user = await User.create({
            name: name,
            email: email,
            password: password
        })
        res.status(201).json({message: 'account created successfully!'})
    }catch(err){
        res.status(500).json({message: 'error creating an account!'})
    }
}