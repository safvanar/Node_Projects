const sequelize = require('./utils/database')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Table = require('./models/table')

const dbRouter = require('./routes/dbRoutes')

const app = express()

app.use(bodyParser.json({extended: false}))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))

app.use('/db', dbRouter)

app.use((req, res, next) => {
    res.sendFile('index.html', {root:'views'})
})


async function initiate(){
    try{
        await sequelize.sync()
        app.listen(3000, () => {
            console.log('server running successfully on port 3000...')
        })
    }catch(err){
        console.log(err)
    }
}

initiate()