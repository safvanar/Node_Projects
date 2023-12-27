const bodyParser = require('body-parser')
const User = require('../models/users')
const bcrypt = require('bcrypt')

function isStringEmpty(string){
    if(string == undefined || string.length === 0){
        return true
    }else{
        return false
    }
}

exports.checkUser = async (req, res, next) => {
    try{
        const email = req.body.email
        const password = req.body.password
        
        const user = await User.findOne({where: {email: email}})
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                res.status(200).json({login: 'success', userId: user.id})
            }else{
                throw new Error('Authentication failure')
            }  
        }
        else{
            res.status(404).json({message: 'username and/or password is incorrect!'})
        }
    }catch(err){
        res.status(401).json({message: 'username and/or password is incorrect!'})
    }
    
}

exports.createUser = async (req, res, next) => {
    try{
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        
        const hashedPassword = bcrypt.hashSync(password, 10)

        if(isStringEmpty(name) || isStringEmpty(email) || isStringEmpty(password)){
            return res.status(400).json({message: 'Fill in all fields!'})
        }
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        res.status(201).json({message: 'account created successfully!'})
    }catch(err){
        res.status(500).json({message: 'error creating an account!'})
    }
}