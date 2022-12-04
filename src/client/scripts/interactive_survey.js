// question types
let MULTIPLE_CHOICE = "MULTIPLE_CHOICE";
let SLIDER = "SLIDER";

let interactiveSurveyDiv = document.getElementById("interactive_survey_div");
let startTitle = document.createElement("h3");
let startButton = document.createElement("button");

// Question Elements
let questionText = document.createElement("p");
let questionDescriptionText = document.createElement("p");
let answersDiv = document.createElement("div");

let questions;
let responses = [];

let currentQuestionPosition = 0;

presentInteractiveSurvey();

function presentInteractiveSurvey(){
    askForStart();
}

// Places a div with a request to start the survey
function askForStart(){
    startTitle.innerHTML = "Start Survey?"
    startButton.innerHTML = "Start"

    startButton.addEventListener("onclick", (event)=>{
        clearScreen();
        initQuestionScreen();
        presentNextQuestion();
    });
}

// creates the question div that will present the survey questions sequentially
function initQuestionScreen(){

}

// goes to the next question in the array and updates the question screen
function presentNextQuestion(){
    currentQuestionPosition++;
    renderQuestion();
}

// collects the response and stores it in the response array
function getResponse(){

}

// util function to help decide how the question should be rendered on the screen
function renderQuestion(question){
    switch(question.type){
        case MULTIPLE_CHOICE:
            generateMultipleChoiceQuestion(question);
            break;
        case SLIDER:
            generateSliderQuestion(question);
            break;
    }
}

function generateMultipleChoiceQuestion(question){

}

function generateSliderQuestion(question){

}

function clearScreen(){
    interactiveSurveyDiv.innerHTML = "";
}