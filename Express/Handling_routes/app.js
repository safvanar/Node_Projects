const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use('/add-product',(req,res,next) =>{
    res.send('<form action="/product" method="POST"><input type="text" placeholder="Enter product" name="title"><input type="number" placeholder="Enter quantity" name="quantity"><button type="submit">Submit</button></form>');
} )

app.use('/product', (req,res,next) => {
    console.log(req.body)
    res.redirect('/')
})

app.use('/',(req,res,next) =>{
    res.send('<h1>Hello from express</h1>');
} )


app.listen(3000);