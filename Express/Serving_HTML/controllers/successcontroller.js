const path = require('path')

const rootDir = require('../utils/path')

exports.successController = (req,res,next) =>{
    console.log(req.body)
    res.sendFile(path.join(rootDir,'views','success.html'));
}