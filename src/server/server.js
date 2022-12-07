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
   surveys: [

   ],
   surveysJson: {

   },
   responses: [

   ],
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
         if(canCreateUser(userCredentials.email)) {
            let newUid = Date.now();
            userCredentials.result = true;
            userCredentials.status = "AUTH_SET";
            userCredentials.uid = newUid;
            addUserToDatabase(userCredentials);
            userCredentials.password = null;
         } else {
            userCredentials = {
               result: false,
               reason: "Email Already In Use",
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
               reason: "Email and/or Password Combination Incorrect",
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

   socket.on("query_community_surveys", (maxSurveyCount)=>{
      socket.emit("query_community_surveys_result", database.surveysJson);
   });

   socket.on("query_user_surveys", (userId)=>{
      socket.emit("query_user_surveys_result", getSurveysByUser(userId));
   });

   socket.on("survey_response_submission", (response)=>{
      addResponseToDatabase(response);
      socket.emit("survey_response_submission_result", true);
   });
   socket.on("query_survey_analytics", (surveyId)=>{
      socket.emit("query_survey_analytics_result", getAnalyticsForSurvey(surveyId));
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

function canCreateUser(email){
   for(let user in database.users){
      if(database.users[user].email === email){
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
   database.surveys.push(newSurveyId);
   database.surveysJson[newSurveyId] = survey;
   printDatabase();
}

function getSurveyFromDatabase(inputtedSurveyId){
   for(let surveyId of database.surveys){
      console.log(inputtedSurveyId);
      console.log(surveyId);
      if(surveyId == inputtedSurveyId){
         console.log("Got survey");
         return database.surveysJson[surveyId];
      }
      console.log("have not found survey")
   }
   return null;
}

function getSurveysByUser(uid){
   let allUserSurveys = {}
   for(let surveyId of database.surveys){
      console.log(surveyId);
      if(database.surveysJson[surveyId].creatorId == uid){
         allUserSurveys[surveyId] = database.surveysJson[surveyId];
         console.log("Got survey from user");
      }
      console.log("have not found survey")
   }
   return allUserSurveys;
}

function getUserFromDatabase(uid){
   for(let userId in database.users){
      if(userId === uid){
         return database.users[userId];
      }
   }

   return null;
}

function addResponseToDatabase(response){
   database.responses.push(response.id);
   database.responsesJson[response.id] = response;
   printDatabase();
}

function printDatabase(){
   console.log(JSON.stringify(database));
}

function getNumberOfRespondents(surveyId){
   let count = 0;
   for(let responseId in database.responsesJson){
      if(responseId.includes(surveyId)){
         console.log(responseId);
         count++;
         console.log(count);
      }
   }
   return count;
}

function getResponsesForSurvey(surveyId){
   let responses = {};
   for(let responseId in database.responsesJson){
      if(responseId.includes(surveyId)) {
         responses[responseId] = database.responsesJson[responseId];
      }
   }
   return responses;
}

function getQuestionAnalytics(surveyId){
   let survey = getSurveyFromDatabase(surveyId);
   let responses = getResponsesForSurvey(surveyId);

   let questionAnalyticsArray = [];

   let i = 0;
   for(let aQuestion of survey.questions){
      let specificQuestionAnalyticArray = [];

      for(let answer of aQuestion.answers){
         specificQuestionAnalyticArray.push([answer, 0]);
      }

      for(let individualResponse in responses) {
         let responseToCheck = responses[individualResponse].responses[i].response;
         if (responseToCheck !== "" || responseToCheck !== null) {
            let p = 0;
            for (let array of specificQuestionAnalyticArray) {
               console.log("comparing " + array[0] + " to " + responseToCheck);
               if (array[0] === responseToCheck) {
                  console.log("SUCCESS THIS " + array[0] + " IS " + responseToCheck);
                  specificQuestionAnalyticArray[p][1]++;
               }
               p++;
            }
         }
      }
      questionAnalyticsArray.push({
         "type": aQuestion.type,
         "question": aQuestion.question,
         "data": specificQuestionAnalyticArray
      });
      i++;
   }

   return questionAnalyticsArray;
}

function getAnalyticsForSurvey(surveyId){
   let questionAnalytics = getQuestionAnalytics(surveyId);

   return {
      "result": true,
      "title": database.surveysJson[surveyId].title,
      "numberOfQuestions": database.surveysJson[surveyId].questions.length,
      "analytics":{
         "dateCreated": database.surveysJson[surveyId].dateCreated,
         "respondents": getNumberOfRespondents(surveyId),
         "questionAnalytics": questionAnalytics
      }
   };
}