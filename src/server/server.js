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

// MOCK DATABASE
   // Store all created surveys
let database = {
   "surveys": [],
   "responses":{

   }
}

io.on("connection", (socket) =>{
   console.log("Visitor connected to " + socket.id);
   socket.emit("welcome_message", "Welcome to survey site, you have connected to socket: " + socket.id);

   socket.on("disconnect", (message) =>{
      console.log("Visitor disconnected: " + message);
   });

   // Checks to see if new account can be created or if existing account can login
   socket.on("verify_credentials", (userCredentials)=>{
      console.log("Got user credentials " + JSON.stringify(userCredentials));
      if(userCredentials.action === "SIGN_UP"){
         userCredentials.result = surveySiteAuth.checkAccountIsNotTaken(userCredentials);
         userCredentials.status = "AUTH_SET"
         userCredentials.uid = "1"
         userCredentials.password = null;

         socket.emit("verify_credentials_result", userCredentials);

         console.log("Sign Up RESULT SENT");
      } else if (userCredentials.action === "LOGIN"){
         userCredentials.result = surveySiteAuth.checkAccountCanLogin(userCredentials);
         userCredentials.status = "AUTH_SET"
         userCredentials.uid = "1"
         userCredentials.userName = "GET FROMDB";
         userCredentials.email = "GETFROMDB@gmail.com";
         userCredentials.organization = "GETFROMDBORG";
         userCredentials.password = null;

         socket.emit("verify_credentials_result", userCredentials);

         console.log("Login RESULT SENT");
      }
   });

   socket.on("verify_logout", (userCredentials)=>{
      if (userCredentials.action === "LOGOUT"){
         userCredentials.result = surveySiteAuth.checkAccountCanLogout(userCredentials);

         socket.emit("verify_logout_result", userCredentials);

         console.log("Logout RESULT SENT");
      }
   })

   socket.on("auth_status_request", (userID)=>{
      if(userID === 1){
         socket.emit("auth_status_response", "LOGGED_IN");
      }
   })

   // survey processing
   socket.on("publish_survey", (survey)=>{
      console.log("Received a survey by "+survey.creatorId+" and pushing it to the database");
      database.surveys.push(survey);
      socket.emit("publish_survey_result", true);
   })

   // survey query service
   socket.on("query_popular_surveys", (maxSurveyCount)=>{
      console.log("got query for popular");
      socket.emit("query_popular_surveys_result", database.surveys);
   });

   socket.on("query_newest_surveys", (maxSurveyCount)=>{
      socket.emit("query_newest_surveys_result", database.surveys);
   });

   socket.on("query_community_surveys", (maxSurveyCount)=>{
      socket.emit("query_community_surveys_result", database.surveys);
   });

   socket.on("query_user_surveys", (userId)=>{
      socket.emit("query_user_surveys_result", database.surveys);
   });

});