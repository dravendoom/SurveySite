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
                    "https://ds6br8f5qp1u2.cloudfront.net/blog/wp-content/uploads/2021/09/Customer-Satisfaction-Survey_-Best-Questions-And-Examples-In-2021@2x.png?x82505")
                )
            }
        }
    })

    userSurveysDiv.appendChild(rowDiv);
}