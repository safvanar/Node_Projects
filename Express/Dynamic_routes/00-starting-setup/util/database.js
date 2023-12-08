const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_projects',
    password: 'Safvanar@1'
})

module.exports = pool.promise()