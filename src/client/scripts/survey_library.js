let userSurveysDiv = document.getElementById("survey_library_created_surveys_list");
let noSurveysCreatedDiv = document.getElementById("survey_library_no_surveys_created_div");

populateUserSurveys();

function populateUserSurveys(){
    let rowDiv = generateRowDiv();

    socket.emit("query_user_surveys", getAuthCookies().uid);

    socket.on("query_user_surveys_result", (surveys)=>{
        if(surveys.length === 0){
            noSurveysCreatedDiv.hidden = false;
            return null;
        } else {
            userSurveysDiv.hidden = false;
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