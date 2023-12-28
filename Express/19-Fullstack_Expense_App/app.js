const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const sequelize = require('./utils/database')

const app = express();

const expenseRoutes = require('./routes/expenseRoute');

app.use(express.static('public'))

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/expense', expenseRoutes);

app.use((req, res, next) => {
    res.sendFile('index.html', {root:'views'})
})

async function initiate(){
    try {
        await sequelize.sync()
            app.listen(5000, () => {
            console.log("Server running on port 3000...")
        })
    } catch (error) {
        console.log(error)
    }
}

initiate()
