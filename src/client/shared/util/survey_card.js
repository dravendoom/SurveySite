function generateSurveyCard(surveyId, title, description, dateCreated, creatorName, image){
    let surveyCard = document.createElement("div");
    surveyCard.classList.add("col","card","shadow");
    surveyCard.classList.add("pb-2");
    surveyCard.classList.add("ms-1");
    surveyCard.classList.add("me-1")
    surveyCard.style.maxWidth = "25vw";

    surveyCard.innerHTML = "                <h3 class='text-center border-bottom shadow rounded-pill'>"+title+"</h3>\n" +
        "                <p class='text-center'>"+description+"</p>\n" +
        "                <span>Created by: "+creatorName+"</span>\n" +
        "                <img class=\"img-fluid img-thumbnail rounded-4 shadow mb-4\" src=\""+image+"\"\n" +
        "                     alt=\"pizza\"\n" +
        "                >\n" +
        "                <button class='border-primary rounded-2 bg-color-grayer' onclick='openSurvey("+surveyId+")'>Start</button>";
    return surveyCard;
}

function generateCreatorSurveyCard(id, title, description, dateCreated, creatorName, image){

    let creatorSurveyCard = document.createElement("div");
    creatorSurveyCard.classList.add("col","card","shadow");
    creatorSurveyCard.classList.add("pb-2");
    creatorSurveyCard.classList.add("ms-1");
    creatorSurveyCard.classList.add("me-1")
    creatorSurveyCard.style.maxWidth = "25vw";

    creatorSurveyCard.innerHTML = "                <h3 class='text-center border-bottom shadow rounded-pill'>"+title+"</h3>\n" +
        "                <p class='text-center'>"+description+"</p>\n" +
        "                <span>Created by: "+creatorName+"</span>\n" +
        "                <img class=\"img-fluid img-thumbnail rounded-4 shadow mb-4\" src=\""+image+"\"\n" +
        "                     alt=\"pizza\"\n" +
        "                >\n" +
        "                <button class='border-primary rounded-2 bg-color-grayer' onclick='openAnalytics("+id+")' >Analytics</button>";
    return creatorSurveyCard;
}

function generateRowDiv(){
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    return rowDiv;
}

function openAnalytics(surveyId){
    console.log(surveyId);
    window.open("../layout/survey_analytics.html?"+surveyId);
}

function openSurvey(surveyId){
    window.open("../layout/survey_interactive.html?"+surveyId);
}