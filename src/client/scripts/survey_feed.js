let isCommunitySurveysReady = false;

let communitySurveys;

queryServerForSurveys();

function queryServerForSurveys(){
    console.log("query server");
    socket.emit("query_community_surveys", 5);

    socket.on("query_community_surveys_result",(surveys)=>{
        console.log(surveys.length);
        isCommunitySurveysReady = true;
        communitySurveys = surveys;

        populateCommunitySurveys(communitySurveys);
    });
}

function populateCommunitySurveys(communitySurveys){

    let communitySurveysParentDiv = document.getElementById("survey_feed_community_list");
    let rowDiv = generateRowDiv();

    for(let surveyId in communitySurveys) {
        rowDiv.appendChild(
            generateSurveyCard(surveyId,
                communitySurveys[surveyId].title,
                communitySurveys[surveyId].description,
                communitySurveys[surveyId].dateCreated,
                communitySurveys[surveyId].creatorId,
                "https://hips.hearstapps.com/hmg-prod/images/dominos-1586183311.jpg")
        );
    }

    communitySurveysParentDiv.appendChild(rowDiv);
}