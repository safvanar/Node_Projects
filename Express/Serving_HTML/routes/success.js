const path = require('path')

const express = require('express')

const rootDir = require('../utils/path')

const router = express.Router()

router.use('/success',(req,res,next) =>{
    console.log(req.body)
    res.sendFile(path.join(rootDir,'views','success.html'));
} )

module.exports = router