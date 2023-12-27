const bodyParser = require('body-parser')
const User = require('../models/users')

exports.createUser = async (req, res, next) => {
    try{
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

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