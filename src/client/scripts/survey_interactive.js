let hasStarted = false;
let currentQuestion;

// question types
let MULTIPLE_CHOICE = "MULTIPLE_CHOICE";
let SLIDER = "SLIDER";

let survey;
let questions = [];
let chosenMcId = [];
let responses = [];

let currentQuestionPosition = -1;

let questionTitle = document.getElementById("survey_interactive_question");

let startDiv = document.getElementById("survey_interactive_start_survey_div");

let multipleChoiceDiv = document.getElementById("survey_interactive_multiple_choice_div");
let sliderDiv = document.getElementById("survey_interactive_slider_div");

let sliderInputTool = document.getElementById("survey_interactive_slider_input");
let sliderValue = document.getElementById("survey_interactive_slider_input_value");

let submitButton = document.getElementById("survey_interactive_submit_button");

let pageSurveyId;

loadInteractiveSurvey();

// pull survey from server using the surveyId
function loadInteractiveSurvey() {
    let surveyIdRegex = RegExp("\\?.*");
    let surveyId = surveyIdRegex.exec(window.location.href)[0].replace("?","");
    pageSurveyId = surveyId;
    socket.emit("query_survey", surveyId);
    socket.on("query_survey_result", (survey)=>{
        if(survey !== null){
            this.survey = survey;
            parseOutSurveyIntoArray();
            return true;
        } else {
            alert("Error fetching survey! Try again later")
            return false;
        }
    })
}

function parseOutSurveyIntoArray(){
    for(let i = 0; i < this.survey.questions.length; i++){
        let subArray = [];
        subArray.push(this.survey.questions[i].type);
        subArray.push(this.survey.questions[i].question);
        if(this.survey.questions[i].type === "MULTIPLE_CHOICE"){
            for(let answer of this.survey.questions[i].answers){
                subArray.push(answer);
            }
        } else if (this.survey.questions[i].type === "SLIDER") {
            for(let answer of this.survey.questions[i].answers){
                subArray.push(answer);
            }
        }
        questions.push(subArray);
    }
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
    if(currentQuestionPosition === questions.length-1) presentSubmitButton();
}

function presentPrevQuestion(){
    if(currentQuestionPosition > 0) currentQuestionPosition--;
    renderQuestion(questions[currentQuestionPosition]);
}

// util function to help decide how the question should be rendered on the screen
function renderQuestion(question){
    switch(question[0]){
        case MULTIPLE_CHOICE:
            currentQuestion = MULTIPLE_CHOICE;
            showMultipleChoiceQuestion(question);
            break;
        case SLIDER:
            currentQuestion = SLIDER;
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
        let id = "survey_interactive_radio"+i;

        let checkedString = (responses[currentQuestionPosition] !== null && id === chosenMcId[currentQuestionPosition]) ? "checked" : null;

        answersDiv.innerHTML = "<label for=\""+id+"\">"+answer+"</label>\n" +
            "            <input id=\""+id+"\" name=\"question"+currentQuestionPosition+"\" type=\"radio\" value=\""+answer+"\"" +
            "            oninput='storeResponse(id)' "+checkedString+"/>";

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

    let setVal = responses[currentQuestionPosition] !== undefined ? responses[currentQuestionPosition] : avg;

    sliderValue.innerText = setVal;
    sliderInputTool.value = setVal;
    questionTitle.innerText = questionText;
}

function storeResponse(mcId){
    let value = document.getElementById(mcId).value;
    chosenMcId[currentQuestionPosition] = mcId;
    responses[currentQuestionPosition] = value;
    console.log("Got MC response: " + responses[currentQuestionPosition]);
}

function updateSliderResponse(){
    sliderValue.innerText = sliderInputTool.value;
    responses[currentQuestionPosition] = sliderInputTool.value;
    console.log("Got Slider response: " + responses[currentQuestionPosition]);
}

function clearCurrentMultipleChoiceAnswersElements(){
    multipleChoiceDiv.innerHTML = "";
}

function presentSubmitButton(){
    submitButton.hidden = false;
}

function submitResponse() {
    if (responses.length > 0) {
        let currentDateInMillis = Date.now();

        let responseJSON = {
            id: pageSurveyId+"|"+getAuthCookies().uid,
            uid: getAuthCookies().uid,
            date: currentDateInMillis,
            responses: []
        }

        for(let i = 0; i < responses.length; i++){
            responseJSON.responses.push({
                id: i,
                type: questions[i][0],
                response: responses[i] === "undefined" || responses[i] === null ? null : responses[i]
            });
        }

        socket.emit("survey_response_submission", responseJSON);
        socket.on("survey_response_submission_result", (result)=>{
            if(result){
                alert("Thank you for taking this survey!");
                window.close();
            } else {
                alert("Oops something went wrong! Please resubmit the survey")
            }
        })
    } else {
        alert("You must respond to at least one question to submit this survey!")
    }
}

