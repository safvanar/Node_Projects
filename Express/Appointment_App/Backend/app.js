const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const sequelize = require('./Utils/database')

const app = express();

const appointmentRoutes = require('./Routes/appointment_route');

app.use(express.static('public'))

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/user', appointmentRoutes);

app.use((req, res, next) => {
    res.sendFile('index.html', {root:'views'})
})

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