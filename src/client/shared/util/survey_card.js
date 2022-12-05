function generateSurveyCard(surveyId, title, description, dateCreated, creatorName, image){
    let surveyCard = document.createElement("div");
    surveyCard.classList.add("col");
    surveyCard.classList.add("pb-2");
    surveyCard.classList.add("ms-1");
    surveyCard.classList.add("me-1")
    surveyCard.style.backgroundColor = "#dddddd";
    surveyCard.style.maxWidth = "25vw";

    surveyCard.innerHTML = "                <h3>"+title+"</h3>\n" +
        "                <p>"+description+"</p>\n" +
        "                <span>Created by "+creatorName+"</span>\n" +
        "                <img class=\"img-fluid img-thumbnail\" src=\""+image+"\"\n" +
        "                     alt=\"pizza\"\n" +
        "                >\n" +
        "                <button style=\"display: block\" onclick='openSurvey("+surveyId+")'>Start</button>";
    return surveyCard;
}

function generateCreatorSurveyCard(id, title, description, dateCreated, creatorName, image){
    let creatorSurveyCard = document.createElement("div");
    creatorSurveyCard.classList.add("col");
    creatorSurveyCard.classList.add("pb-2");
    creatorSurveyCard.classList.add("ms-1");
    creatorSurveyCard.classList.add("me-1")
    creatorSurveyCard.style.backgroundColor = "#dddddd";
    creatorSurveyCard.style.maxWidth = "25vw";

    creatorSurveyCard.innerHTML = "                <h3>"+title+"</h3>\n" +
        "                <p>"+description+"</p>\n" +
        "                <span>Created by "+creatorName+"</span>\n" +
        "                <img class=\"img-fluid img-thumbnail\" src=\""+image+"\"\n" +
        "                     alt=\"pizza\"\n" +
        "                >\n" +
        "                <button style=\"display: block; background-color: #0dcaf0; color: #1a1a1a\">Analytics</button>";
    return creatorSurveyCard;
}

function generateRowDiv(){
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    rowDiv.classList.add("ms-2");
    rowDiv.classList.add("me-2");
    return rowDiv;
}

function openSurvey(surveyId){
    window.open("../layout/survey_interactive.html?"+surveyId);
}