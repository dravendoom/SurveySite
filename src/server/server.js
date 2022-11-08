const express = require("express");
const app = express();

let port = 2222;
let hostName = "localhost"

let actualRootDirectory = "../client/layout"
let aliasRootDirectory = "/main"

app.use(aliasRootDirectory, express.static(actualRootDirectory));

app.listen(port, hostName, ()=>{
   console.log("Server started listening for connections");
});