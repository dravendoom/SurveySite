let questionCount = 0;
let questionsDiv = document.getElementById("survey_creator_questions_div");

// an array that stores all question ids and response ids as objects
let questionIdArray = [];

// functions to add mc questions
function addMultipleChoiceQuestionPrompt(){
    questionCount++;

    let parentDiv = document.createElement("div");
    let mcRandomIdentifier = Date.now();
    parentDiv.id = "mc_parent_"+mcRandomIdentifier;

    let elements = [parentDiv.id, "mc_question_input_"+mcRandomIdentifier];

    let mcDivHtml =
        "<div id=\"mc_div_"+mcRandomIdentifier+"\" class=\"ms-4 mt-3\">\n" +
        "    <h5 id=\"mc_header_"+mcRandomIdentifier+"\">> Question "+questionCount+" (Multiple Choice)</h5>\n" +
        "    <label for=\"mc_question_input_"+mcRandomIdentifier+"\">Question</label>\n" +
        "    <textarea id=\"mc_question_input_"+mcRandomIdentifier+"\"></textarea>\n" +
        "    <button id=\"mc_question_add_response_button_"+mcRandomIdentifier+"\" onclick='addMultipleChoiceResponsePrompt("+elements+")'>Add response +</button>\n" +
        "  </div>"

    parentDiv.innerHTML = mcDivHtml;

    questionsDiv.insertBefore(parentDiv, null);
    questionIdArray.push(["mc_question_input_"+mcRandomIdentifier]);
}

// function to add possible responses to multiple choice questions
function addMultipleChoiceResponsePrompt(parent, question){
    let random_id = Date.now();
    let mcrDivHtml = "<div id="+parent.id+"_response_div_"+random_id+"\" class=\"ms-5 mt-3\">\n" +
        "      <h5>Response</h5>\n" +
        "      <input id="+parent.id+"_response_input_"+random_id+">\n" +
        "    </div>\n"

    let holderDiv = document.createElement("div");
    holderDiv.innerHTML = mcrDivHtml;

    document.getElementById(parent.id).appendChild(holderDiv);

    let i = 0;
    for(let idArray of questionIdArray){
        if(idArray[0].includes(question.id)){
            idArray.push(parent.id+"_response_input_"+random_id);
            questionIdArray[i] = idArray;
        }
        i++;
    }
}

// function to add slider questions
function addSliderQuestionPrompt(){
    questionCount++;
    let slRandomIdentifier = Date.now();
    let slDivHtml = "<div id=\"sl_"+slRandomIdentifier+"_div\" class=\"ms-4 mt-3\">\n" +
        "    <h5 id=\"sl_"+questionCount+"_header\">> Question "+questionCount+" (Slider)</h5>\n" +
        "    <div class=\"ms-4\">\n" +
        "      <label for=\"sl_"+slRandomIdentifier+"_input\">Question</label>\n" +
        "      <input id=\"sl_"+slRandomIdentifier+"_input\"/>\n" +
        "      <label for=\"sl_"+slRandomIdentifier+"_max\">Minimum Value</label>\n" +
        "      <input id=\"sl_"+slRandomIdentifier+"_max\" type=\"number\"/>\n" +
        "      <label for=\"sl_"+slRandomIdentifier+"_min\">Maximum Value</label>\n" +
        "      <input id=\"sl_"+slRandomIdentifier+"_min\" type=\"number\"/>\n" +
        "    </div>\n" +
        "  </div>"

    let parentDiv = document.createElement("div");
    parentDiv.innerHTML = slDivHtml;

    questionsDiv.appendChild(parentDiv);
    questionIdArray.push([
        "sl_"+slRandomIdentifier+"_input",
        "sl_"+slRandomIdentifier+"_max",
        "sl_"+slRandomIdentifier+"_min"
    ]);
}

// submits questions to server
function submitQuestions(){
    console.log("submitting questions");
    let questionsJSON = packQuestions();
    if(questionsJSON === null){
        alert("You have no valid questions!");
    } else {
        console.log(JSON.stringify(questionsJSON));
        alert("You have valid questions!")
    }
}

// packs questions into JSON object to be sent to server
function packQuestions(){
    // iterate over question id's
    let i = 0;
    // JSON questions ready for server and DB
    let allQuestionsObject = {
        questions: []
    }

    let questionObject;
    for(let questionIdChildArray of questionIdArray){
        if(questionIdChildArray[0].includes("mc")){
            questionObject = processMultipleChoiceQuestion(questionIdChildArray, i);
        } else if(questionIdChildArray[0].includes("sl")){
            questionObject = processSliderQuestion(questionIdChildArray, i);
        }

        if(questionObject === null){
            alert("At least one of your questions is not filled out correctly");
            return null;
        } else {
            allQuestionsObject.questions.push(questionObject);
        }
        i++;
    }

    if(allQuestionsObject.questions.length === 0){
        return null;
    }

    return allQuestionsObject;
}

function processMultipleChoiceQuestion(mcArray, questionNumber){

    let question = document.getElementById(mcArray[0]).value;

    if (question === ""){
        return null;
    }

    let mcObject = {
        id: questionNumber,
        question: question,
        type: "MULTIPLE_CHOICE",
        answers: []
    }

    for(let i = 1; i < mcArray.length; i++){
        console.log("ID to get" + mcArray[i]);
        console.log("i" + i);
        let responseInput = document.getElementById(mcArray[i]);
        console.log("The value to check for: " + responseInput.value);
        if(responseInput.value !== "") {
            console.log("pushed mc response" + responseInput.value)
            mcObject.answers.push(responseInput.value);
        } else {
            alert("You have missing responses");
            return null;
        }
    }

    return mcObject;
}

function processSliderQuestion(slArray, questionNumber){
    let question = document.getElementById(slArray[0]).value;

    if (question === ""){
        return null;
    }

    let slObject = {
        id: questionNumber,
        question: question,
        type: "SLIDER",
        answers: []
    }

    let min, max;

    min = document.getElementById(slArray[1]).value;
    max = document.getElementById(slArray[2]).value;

    if(min === "" || max === ""){
        alert("At least one of your slider questions are missing min and max values")
        return null;
    } else if(min >= max){
        alert("One of your slider questions has an min greater than or equal to max");
        return null;
    } else {
        slObject.answers.push(min);
        slObject.answers.push(max);
    }

    return slObject;
}