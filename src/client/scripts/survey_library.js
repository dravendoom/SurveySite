let userWelcomeHeader = document.getElementById("survey_library_welcome_header");

let userSurveysDiv = document.getElementById("survey_library_created_surveys_list");
let noSurveysCreatedDiv = document.getElementById("survey_library_no_surveys_created_div");

populateUserSurveys();

function populateUserSurveys(){
    userWelcomeHeader.innerText = "Hello, " + getAuthCookies().userName;

    let rowDiv = generateRowDiv();

    socket.emit("query_user_surveys", getAuthCookies().uid);

    socket.on("query_user_surveys_result", (surveys)=>{
        console.log(JSON.stringify(surveys));
        if(JSON.stringify(surveys) === "{}"){
            console.log("no surveys");
            userSurveysDiv.hidden = true;
            noSurveysCreatedDiv.hidden = false;
            return null;
        } else {
            userSurveysDiv.hidden = false;
            noSurveysCreatedDiv.hidden = true;
            for (let surveyId in surveys) {
                rowDiv.appendChild(generateCreatorSurveyCard(
                    surveyId,
                    surveys[surveyId].title,
                    surveys[surveyId].description,
                    surveys[surveyId].dateCreated,
                    getAuthCookies().userName,
                    "https://hips.hearstapps.com/hmg-prod/images/dominos-1586183311.jpg")
                )
            }
        }
    })

    userSurveysDiv.appendChild(rowDiv);
}