let isCommunitySurveysReady = false;

let communitySurveys;

queryServerForSurveys();

function queryServerForSurveys(){
    socket.emit("query_community_surveys", 5);

    socket.on("query_community_surveys_result",(surveys)=>{
        isCommunitySurveysReady = true;
        communitySurveys = surveys;
        populateCommunitySurveys(communitySurveys);
    });
}

function populateCommunitySurveys(communitySurveys){
    let communitySurveysParentDiv = document.getElementById("survey_feed_community_list");
    let rowDiv = generateRowDiv();

    let cardCount = 0;
    let i = 0;
    for(let surveyId in communitySurveys) {
        if(i === 4){
            communitySurveysParentDiv.appendChild(rowDiv);
            rowDiv = generateRowDiv();
        }
            rowDiv.appendChild(
                generateSurveyCard(surveyId,
                    communitySurveys[surveyId].title,
                    communitySurveys[surveyId].description,
                    communitySurveys[surveyId].dateCreated,
                    communitySurveys[surveyId].userName,
                    "https://ds6br8f5qp1u2.cloudfront.net/blog/wp-content/uploads/2021/09/Customer-Satisfaction-Survey_-Best-Questions-And-Examples-In-2021@2x.png?x82505")
            );
        cardCount++;
        i++;
    }

    communitySurveysParentDiv.appendChild(rowDiv);
}