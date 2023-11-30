const express = require('express')

const router = express.Router()

router.get('/add-product',(req,res,next) =>{
    res.send('<form action="/admin/add-product" method="POST"><input type="text" placeholder="Enter product" name="title"><input type="number" placeholder="Enter quantity" name="quantity"><button type="submit">Submit</button></form>');
} )

router.post('/add-product', (req,res,next) => {
    console.log(req.body)
    res.redirect('/')
})

module.exports = router
