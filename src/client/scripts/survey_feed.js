let isPopularSurveysReady = false;
let isNewestSurveysReady = false;
let isCommunitySurveysReady = false;

let popularSurveys, newestSurveys, communitySurveys;

queryServerForSurveys();

function queryServerForSurveys(){
    console.log("query server");
    socket.emit("query_popular_surveys", 5);
    socket.emit("query_newest_surveys", 5);
    socket.emit("query_community_surveys", 5);

    socket.on("query_popular_surveys_result",(surveys)=>{
        console.log("survey length" + surveys.length);
        isPopularSurveysReady = true;
        popularSurveys = surveys;

        if(isPopularSurveysReady && isNewestSurveysReady && isCommunitySurveysReady) populateAllSurveys(popularSurveys, newestSurveys, communitySurveys);
    });

    socket.on("query_newest_surveys_result",(surveys)=>{
        console.log(surveys.length);
        isNewestSurveysReady = true;
        newestSurveys = surveys;

        if(isPopularSurveysReady && isNewestSurveysReady && isCommunitySurveysReady) populateAllSurveys(popularSurveys, newestSurveys, communitySurveys);
    });

    socket.on("query_community_surveys_result",(surveys)=>{
        console.log(surveys.length);
        isCommunitySurveysReady = true;
        communitySurveys = surveys;

        if(isPopularSurveysReady && isNewestSurveysReady && isCommunitySurveysReady) populateAllSurveys(popularSurveys, newestSurveys, communitySurveys);
    });
}

function populateAllSurveys(popularSurveys, newestSurveys, communitySurveys){
    populatePopularSurveys(popularSurveys);
    populateNewestSurveys(newestSurveys);
    populateCommunitySurveys(communitySurveys);
}

function populatePopularSurveys(popularSurveys){
    let popularSurveysParentDiv = document.getElementById("survey_feed_popular_list");
    let rowDiv = generateRowDiv();

    for(let i = 0; i < popularSurveys.length; i++) {
        rowDiv.appendChild(
            generateSurveyCard(i,
                popularSurveys[i].title,
                popularSurveys[i].description,
                popularSurveys[i].dateCreated,
                popularSurveys[i].creatorId,
                "https://hips.hearstapps.com/hmg-prod/images/dominos-1586183311.jpg")
        );
    }

    popularSurveysParentDiv.appendChild(rowDiv);
}

function populateNewestSurveys(newestSurveys){

    let newestSurveysParentDiv = document.getElementById("survey_feed_new_list");
    let rowDiv = generateRowDiv();

    for(let i = 0; i < newestSurveys.length; i++) {
        rowDiv.appendChild(
            generateSurveyCard(i,
                popularSurveys[i].title,
                popularSurveys[i].description,
                popularSurveys[i].dateCreated,
                popularSurveys[i].creatorId,
                "https://hips.hearstapps.com/hmg-prod/images/dominos-1586183311.jpg")
        );
    }

    newestSurveysParentDiv.appendChild(rowDiv);
}

function populateCommunitySurveys(communitySurveys){

    let communitySurveysParentDiv = document.getElementById("survey_feed_community_list");
    let rowDiv = generateRowDiv();

    for(let i = 0; i < communitySurveys.length; i++) {
        rowDiv.appendChild(
            generateSurveyCard(i,
                popularSurveys[i].title,
                popularSurveys[i].description,
                popularSurveys[i].dateCreated,
                popularSurveys[i].creatorId,
                "https://hips.hearstapps.com/hmg-prod/images/dominos-1586183311.jpg")
        );
    }

    communitySurveysParentDiv.appendChild(rowDiv);
}