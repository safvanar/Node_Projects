const path = require('path')

const rootDir = require('../utils/path')

exports.getContact = (req,res,next) =>{
    res.sendFile(path.join(rootDir,'views','contactus.html'));
}