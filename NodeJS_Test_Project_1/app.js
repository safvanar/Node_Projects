const sequelize = require('./utils/database')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')
const Comment = require('./models/comment')

const blogRouter = require('./routes/blogRoutes')

const app = express()

app.use(bodyParser.json({extended: false}))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))

app.use('/blogs', blogRouter)

app.use((req, res, next) => {
    res.sendFile('index.html', {root:'views'})
})

Blog.hasMany(Comment, { constraints: true, onDelete: 'CASCADE' })
Comment.belongsTo(Blog, { constraints: true, onDelete: 'CASCADE' })

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