let hasStarted = false;

// question types
let MULTIPLE_CHOICE = "MULTIPLE_CHOICE";
let SLIDER = "SLIDER";

let survey;
let questions = [
    ["MULTIPLE_CHOICE", "Do you like pizza?", "Yes", "No", "Maybe"],
    ["SLIDER", "How much", 0, 100],
    ["MULTIPLE_CHOICE", "Do you like pizza?", "Yes", "No", "Maybe"],
    ["MULTIPLE_CHOICE", "Do you like pizza?", "Yes", "No", "Maybe"],
    ["SLIDER", "When do you want it?", 0, 200]
];
let responses = [];
let exampleResponses = [
    "Yes",
    0,
    "No",
    "No",
    100
];

let currentQuestionPosition = -1;

let questionTitle = document.getElementById("survey_interactive_question");

let startDiv = document.getElementById("survey_interactive_start_survey_div");

let multipleChoiceDiv = document.getElementById("survey_interactive_multiple_choice_div");
let sliderDiv = document.getElementById("survey_interactive_slider_div");

let sliderInputTool = document.getElementById("survey_interactive_slider_input");
let sliderValue = document.getElementById("survey_interactive_slider_input_value");

loadInteractiveSurvey();

// pull survey from server using the surveyId
function loadInteractiveSurvey() {
    let surveyIdRegex = RegExp("\\?.*");
    let surveyId = surveyIdRegex.exec(window.location.href)[0].replace("?","");
    socket.emit("query_survey", surveyId);
    socket.on("query_survey_result", (survey)=>{
        if(survey !== null){
            this.survey = survey;
            return true;
        } else {
            return false;
        }
    })
}

function start(){
    startDiv.hidden = true;
    questionTitle.hidden = false;

    // starts from -1 and goes to array position 0 (first question)
    presentNextQuestion();
}

// goes to the next question in the array and updates the question screen
function presentNextQuestion(){
    if(currentQuestionPosition < questions.length-1) currentQuestionPosition++;
    renderQuestion(questions[currentQuestionPosition]);
    hasStarted = true;
}

function presentPrevQuestion(){
    if(currentQuestionPosition > 0) currentQuestionPosition--;
    renderQuestion(questions[currentQuestionPosition]);
}

// util function to help decide how the question should be rendered on the screen
function renderQuestion(question){
    switch(question[0]){
        case MULTIPLE_CHOICE:
            showMultipleChoiceQuestion(question);
            break;
        case SLIDER:
            showSliderQuestion(question);
            break;
    }
}

function showMultipleChoiceQuestion(question){
    multipleChoiceDiv.hidden = false;
    sliderDiv.hidden = true;

    clearCurrentMultipleChoiceAnswersElements();

    let questionText = question[1];

    questionTitle.innerText = questionText;

    for(let i = 2; i < question.length; i++){
        let answer = question[i];
        let answersDiv = document.createElement("div");
        answersDiv.innerHTML = "<label for=\"survey_interactive_radio"+i+"\">"+answer+"</label>\n" +
            "            <input id=\"survey_interactive_radio"+i+"\"name=\"question"+i+"\" type=\"radio\" value=\""+answer+"\"/>"
        multipleChoiceDiv.appendChild(answersDiv);
    }
}

function showSliderQuestion(question){
    multipleChoiceDiv.hidden = true;
    sliderDiv.hidden = false;

    let questionText = question[1];
    let min = question[2];
    let max = question[3];

    sliderInputTool.min = min;
    sliderInputTool.max = max;
    let avg = Math.floor((Number.parseInt(max)+Number.parseInt(min))/2).toString()
    sliderValue.innerText = avg;
    sliderInputTool.value = avg;

    questionTitle.innerText = questionText;
}

function storeMultipleChoiceResponse(){
    responses.push();
}

function storeSliderResponse(){
    responses.push();
}

function updateSliderTextValue(){
    sliderValue.innerText = sliderInputTool.value;
}

function clearCurrentMultipleChoiceAnswersElements(){
    multipleChoiceDiv.innerHTML = "";
}