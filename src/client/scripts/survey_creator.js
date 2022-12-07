let questionCount = 0;
let responseCount = 0;
let questionsDiv = document.getElementById("survey_creator_questions_div");

// an array that stores all question ids and response ids as objects
let questionIdArray = [];

// functions to add mc questions
function addMultipleChoiceQuestionPrompt(){
    questionCount++;

    let parentDiv = document.createElement("div");
    let mcRandomIdentifier = Date.now();
    parentDiv.id = "mc_parent_"+mcRandomIdentifier;
    parentDiv.classList.add("card","container","mx-auto","shadow","mb-2")
    parentDiv.style.width = "90%";

    let elements = [parentDiv.id, "mc_question_input_"+mcRandomIdentifier];

    let mcDivHtml =
        "<div id=\"row"+mcRandomIdentifier+"\"  class=\"row mx-auto\">\n" +

        "<div id=\"mc_div_"+mcRandomIdentifier+"\" class=\"ms-4 mt-3\">\n" +
        "    <h5 id=\"mc_header_"+mcRandomIdentifier+"\" class=\"border-bottom border-dark pb-2 shadow\" >> Question: "+questionCount+" (Multiple Choice)</h5>\n" +
        "    <label for=\"mc_question_input_"+mcRandomIdentifier+"\">Question</label>\n" +
        "    <textarea id=\"mc_question_input_"+mcRandomIdentifier+"\" class=\"border-primary rounded-2 bg-color-grayer\"></textarea>\n" +
        "    <button id=\"mc_question_add_response_button_"+mcRandomIdentifier+"\" class=\"border-primary rounded-pill bg-color-grayer mb-2\" onclick='addMultipleChoiceResponsePrompt("+elements+")'>Add response +</button>\n" +
        "  </div> </div> </div> </div>"

    parentDiv.innerHTML = mcDivHtml;

    questionsDiv.insertBefore(parentDiv, null);
    questionIdArray.push(["mc_question_input_"+mcRandomIdentifier]);
}

// function to add possible responses to multiple choice questions
function addMultipleChoiceResponsePrompt(parent, question){
    responseCount++;
    let random_id = Date.now();
    let mcrDivHtml = "<div id="+parent.id+"_response_div_"+random_id+"\" class=\"mx-auto justify-content-center text-center\">\n" +
        "      <h5 class='text-black border-bottom'>Response: "+responseCount+"</h5>\n" +
        "      <input class='border-primary rounded-pill' id="+parent.id+"_response_input_"+random_id+">\n" +
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
    let slDivHtml = "<div id=\"sl_"+slRandomIdentifier+"_div\" class=\"\">\n" +
        "    <h5 class=\"border-bottom border-dark pb-2 shadow text-center\"  id=\"sl_"+questionCount+"_header\">> Question "+questionCount+" (Slider)</h5>\n" +
        "    <div class=\"container mb-2\">\n" +
        "      <label class=\"row justify-content-center border-primary\" for=\"sl_"+slRandomIdentifier+"_input\">Question</label>\n" +
        "      <input class=\"row mx-auto border-primary rounded-pill\" id=\"sl_"+slRandomIdentifier+"_input\"/>\n" +
        "      <label class=\"row justify-content-center border-primary\" for=\"sl_"+slRandomIdentifier+"_max\">Minimum Value</label>\n" +
        "      <input class=\"row mx-auto border-primary rounded-pill\" id=\"sl_"+slRandomIdentifier+"_max\" type=\"number\"/>\n" +
        "      <label class=\"row justify-content-center border-primary\" for=\"sl_"+slRandomIdentifier+"_min\">Maximum Value</label>\n" +
        "      <input class=\"row mx-auto border-primary rounded-pill\" id=\"sl_"+slRandomIdentifier+"_min\" type=\"number\"/>\n" +
        "    </div>\n" +
        "  </div>"

    let parentDiv = document.createElement("div");
    parentDiv.classList.add("card","container","mx-auto","shadow","mb-2")
    parentDiv.style.width = "90%";
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
    let questionsJSON = packSurvey();
    if(questionsJSON !== null){
        socket.emit("publish_survey", questionsJSON);
        socket.on("publish_survey_result", (isPublished)=>{
            if(isPublished){
                alert("Success! Survey " + questionsJSON.title + " published!");
                window.location.assign("../layout/survey_library.html");
            } else {
                alert("Error: Survey " + questionsJSON.title + " was not able to be published. Try submitting again.");
            }
        })
    }
}

// packs questions into JSON object to be sent to server
function packSurvey(){
    let title = document.getElementById("survey_creator_title_input").value;
    let description = document.getElementById("survey_creator_description_input").value;
    let imagePath = document.getElementById("survey_creator_image_input").value;

    if(title === "" || title === null){
        alert("Survey must have a title");
        return null;
    } else if(description === "" || description === null) {
        alert("Survey must have a description");
        return null;
    }

    // iterate over question id's
    let i = 0;
    // JSON questions ready for server and DB
    let allQuestionsObject = {
        creatorId: getAuthCookies().uid,
        title: title,
        description: description,
        dateCreated: Date.now(),
        hasImage: imagePath!==null,
        imageId: -1,
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

function processMultipleChoiceQuestion(mcArray, questionNumber) {

    let question = document.getElementById(mcArray[0]).value;

    if (question === "") {
        return null;
    }

    let mcObject = {
        id: questionNumber,
        question: question,
        type: "MULTIPLE_CHOICE",
        answers: []
    }

    for (let i = 1; i < mcArray.length; i++) {
        console.log("ID to get" + mcArray[i]);
        console.log("i" + i);
        let responseInput = document.getElementById(mcArray[i]);
        console.log("The value to check for: " + responseInput.value);
        if (responseInput.value !== "") {
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
    console.log("min " + min);
    console.log("max " + max);

    if(min === "" || max === ""){
        alert("At least one of your slider questions are missing min and max values")
        return null;
    } else if(min >= max){
        console.log("min greater than max");
        alert("One of your slider questions has an min greater than or equal to max");
        return null;
    } else {
        slObject.answers.push(min);
        slObject.answers.push(max);
    }

    return slObject;
}