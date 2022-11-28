const express = require("express");
const app = express();

const { createServer } = require("http");
const { Server } = require("socket.io");
const surveySiteAuth = require("./authentication/survey_site_auth.js");

let port = 2222;
let hostName = "localhost"

let actualRootDirectory = "../client/"
let aliasRootDirectory = "/main"

// EXPRESS APP

app.use(aliasRootDirectory, express.static(actualRootDirectory));
let httpServer = createServer(app);

httpServer.listen(port, hostName, ()=>{
   console.log("Server started listening for connections");
});

// SOCKET COMMUNICATION WITH CLIENT

let io = new Server(httpServer, {});

io.on("connection", (socket) =>{
   console.log("Visitor connected to " + socket.id);
   socket.emit("welcome_message", "Welcome to survey site, you have connected to socket: " + socket.id);

   socket.on("disconnect", (message) =>{
      console.log("Visitor disconnected: " + message);
   });

   // Checks to see if new account can be created or if existing account can login
   socket.on("verify_credentials", (userCredentials)=>{
      console.log("Got user credentials " + JSON.stringify(userCredentials));
      if(userCredentials.action === "sign_up"){
         console.log("Sign Up RESULT SENT");
         socket.emit("verify_credentials_result", surveySiteAuth.checkAccountIsNotTaken(userCredentials));
      } else if (userCredentials.action === "login"){
         console.log("Login RESULT SENT");
         socket.emit("verify_credentials_result", surveySiteAuth.checkAccountCanLogin(userCredentials));
      }
   });

   socket.on("auth_status_request", (userID)=>{
      if(userID === 1){
         socket.emit("auth_status_response", "LOGGED_IN");
      }
   })

});