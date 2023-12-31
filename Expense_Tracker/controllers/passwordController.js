const bodyParser = require('body-parser')
const User = require('../models/users')
const sequelize = require('../utils/database')

const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.SMTP_API_KEY
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
        console.log('USER>>>>>>>>> ',user.name)
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

//Rundan's code

// const User = require('../models/users')
// const Sib = require('sib-api-v3-sdk');

// const tranEmailApi = new Sib.TransactionalEmailsApi();

// // Set the Sendinblue API key during the application initialization
// const client = Sib.ApiClient.instance;
// const apiKey = client.authentications['api-key'];
// apiKey.apiKey = process.env.SMTP_API_KEY;



// exports.resetPassword = async (req, res) => {
//     const { resetEmail } = req.body;

//     try {
//         const user = await User.findOne({ where: { email: resetEmail } });
//         if (user) {
//             console.log(user)
//             // const randomUUID = uuidv4();

//             // await user.createForgotPassword({ id: randomUUID, active: true })
//             //     .catch((err) => {
//             //         throw new Error(err);
//             //     })

//             const sender = {
//                 email: 'safvanforfkart@gmail.com',
//                 name: 'Safvan A R'
//             };

//             const receivers = [
//                 {
//                     email: user.email,
//                 },
//             ];

//             // const resetLink = http://localhost:3000/password/reset-password/${randomUUID}

//             tranEmailApi.sendTransacEmail({
//                 sender,
//                 to: receivers,
//                 subject: 'Reset the password',
//                 textContent: 'Visit the link to reset password'
//                 // htmlContent: `<p>Visit the following link to reset your password:</p>
//                 //               <a href="${resetLink}">click here to reset password</a>`
//             })
//                 .then((response) => {
//                     console.log(response);
//                     res.status(200).json({ message: 'Password reset email sent successfully' });
//                 })
//                 .catch((error) => {
//                     throw new Error('Internal server error')
//                 });
//         }
//         else {
//             res.status(404).json({ message: 'User not found with this email' });
//         }
//     }
//     catch (err) {
//         res.status(500).json(err.message);
//     }

// };