const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const sequelize = require('./utils/database')

const app = express();

const expenseRoutes = require('./routes/expenseRoute');

const userRoutes = require('./routes/userRoute')

const purchaseRoutes = require('./routes/purchaseRoute')

const premiumRoutes = require('./routes/premiumRoute')

const passwordRoutes = require('./routes/passwordRoute')

const User = require('./models/users')

const Expense = require('./models/expenseModel')

const Order = require('./models/orders')

require('dotenv').config();

app.use(express.static('public'))

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/user', userRoutes)

app.use('/premium', premiumRoutes)

app.use('/expense', expenseRoutes);

app.use('/purchase', purchaseRoutes)

app.use('/password', passwordRoutes)

app.use('/home', (req, res, next) => {
    res.sendFile('index.html', {root:'views'})
})

app.use('/signup', (req, res, next) => {
    res.sendFile('signup.html', {root:'views'})
})

app.use((req, res, next) => {
    res.sendFile('login.html', {root:'views'})
})

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

async function initiate(){
    try {
        await sequelize.sync()
            app.listen(3000, () => {
            console.log("Server running on port 3000...")
        })
    } catch (error) {
        console.log(error)
    }
}

initiate()
