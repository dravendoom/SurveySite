const {createPool} = require('mysql');
const pool = createPool({
    host : "localhost",
    user: "root",
    password: "rootuser",
    connectionlimit: 10
})
