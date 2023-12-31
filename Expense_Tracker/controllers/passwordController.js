const bodyParser = require('body-parser')
const User = require('../models/users')
const sequelize = require('../utils/database')

const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.MAIL_API_KEY
const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender ={
    email: 'safvanforfkart@gmail.com',
    name: 'Expense Tracker Pro'
}
exports.resetPassword = async (req, res, next) => {
    try{
        const resetEmail = req.body.resetEmail
        const receiver = [{email: resetEmail}]
        const user = await User.findOne({where: {email: resetEmail}})
        await tranEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: 'Password reset',
            textContent: `Hello person,<br>
                        Your password of expense tracker pro is 'password-here'`,
            user: {
                name: user.name
            }
        })
        // const users = await User.findAll({attributes: ['name', 'totalSpending'], order: [['totalSpending', 'DESC']]})
        res.status(201).json({message: 'succesful!'})
    }catch(err){
        console.log(err)
        res.status(403).json({message: 'Error sending email!'})
    }
}