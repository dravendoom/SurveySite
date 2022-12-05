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
   users: {
      "1670213963808":{
         "uid":1670213963808,
         "userName":"Born Yesterday",
         "birthDate":"2022-12-03",
         "organization":"UNF",
         "email": "testy@unf.edu",
         "password":"InitialD86"
      }
   },
   surveys: {

   },
   surveysJson:{

   },
   responses:{

   },
   responsesJson:{

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
         if(canCreateUser(userCredentials.email, userCredentials.password)) {
            let newUid = Date.now();
            userCredentials.result = true;
            userCredentials.status = "AUTH_SET";
            userCredentials.uid = newUid;
            addUserToDatabase(userCredentials);
            userCredentials.password = null;
         } else {
            userCredentials = {
               result: false,
               status: "AUTH_NULL"
            }
         }

         socket.emit("verify_credentials_result", userCredentials);

         console.log("Sign Up RESULT SENT");
      } else if (userCredentials.action === "LOGIN"){
         let storedUser = canValidateAccount(userCredentials.email, userCredentials.password)
         if(storedUser !== null) {
            console.log("found stored user " + JSON.stringify(storedUser));
            userCredentials.result = true;
            userCredentials.status = "AUTH_SET";
            userCredentials.uid = storedUser.uid;
            userCredentials.userName = storedUser.userName;
            userCredentials.birthDate = storedUser.birthDate;
            userCredentials.organization = storedUser.organization;
            userCredentials.password = null;
         } else {
            userCredentials = {
               result: false,
               status: "AUTH_NULL"
            };
         }

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
      console.log("Received "+ JSON.stringify(survey) +" by " + survey.creatorId + " and pushing it to the database");
      addSurveyToDatabase(survey);
      socket.emit("publish_survey_result", true);
   })

   // survey query service

   socket.on("query_survey", (surveyId)=>{
      socket.emit("query_survey_result", getSurveyFromDatabase(surveyId));
   });

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

function canValidateAccount(email, password){
   for(let userId in database.users){
      if(
          database.users[userId].email === email
          && database.users[userId].password === password
      ){
         return getUserFromDatabase(userId);
      }
   }

   return null;
}

function canCreateUser(email, username){
   for(let user in database.users){
      if(user.email === email && user.userName === username){
         return false;
      }
   }
   return true;
}

function addUserToDatabase(user){

   let newUid = Date.now();

   database.users[newUid] = {
      "uid": newUid,
      "userName": user.userName,
      "birthDate": user.birthDate,
      "organization": user.organization,
      "email": user.email,
      "password": user.password,
   };
   printDatabase();
}

function addSurveyToDatabase(survey){
   let newSurveyId = Date.now();
   database.surveys[newSurveyId] = survey;
   printDatabase();
}

function getSurveyFromDatabase(inputtedSurveyId){
   for(let surveyId in database.surveys){
      if(surveyId === inputtedSurveyId){
         return surveyId.users[surveyId];
      }
   }
   return null;
}

function getUserFromDatabase(uid){
   for(let userId in database.users){
      if(userId === uid){
         return database.users[userId];
      }
   }

   return null;
}

function printDatabase(){
   console.log(JSON.stringify(database));
}