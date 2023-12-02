const path = require('path')

const express = require('express');

const rootDir = require('./utils/path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const contactRoutes = require('./routes/contact')
const successRoutes = require('./routes/success')

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(contactRoutes)
app.use(successRoutes)
app.use((req,res,next) => {
    res.status(404).sendFile(path.join(rootDir,'views','404.html'))
})


app.listen(3000);