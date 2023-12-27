const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const sequelize = require('./utils/database')

const app = express();

const expenseRoutes = require('./routes/expenseRoute');

const userRoutes = require('./routes/userRoute')

const User = require('./models/users')

const Expense = require('./models/expenseModel')

app.use(express.static('public'))

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/user', userRoutes)

app.use('/expense', expenseRoutes);

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
