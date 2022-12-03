let questionCount = 0;
// array of JSON formatted questions
let questions = [];

let questionsDiv = document.getElementById("survey_creator_questions_div");

// functions to add questions

function addMultipleChoiceQuestionPrompt(){
    questionCount++;

    let parentDiv = document.createElement("div");
    parentDiv.id = "mcpd_"+Date.now();

    let mcDivHtml =
        "<div id=\"multiple_choice_prompt_div_"+questionCount+"\" class=\"ms-4 mt-3\">\n" +
        "    <h5 id=\"mc_question_indicator_"+questionCount+"\">> Question "+questionCount+" (Multiple Choice)</h5>\n" +
        "    <label for=\"mc_question_input_"+questionCount+"\">Question</label>\n" +
        "    <textarea id=\"mc_question_input_"+questionCount+"\"></textarea>\n" +
        "    <button id=\"mc_question_add_response_button_"+questionCount+"\" onclick='addMultipleChoiceResponsePrompt("+parentDiv.id+")'>Add response +</button>\n" +
        "  </div>"

    parentDiv.innerHTML = mcDivHtml;

    questionsDiv.insertBefore(parentDiv, null);
}

function addSliderQuestionPrompt(){
    questionCount++;
    let slDivHtml = "<div id=\"slider_prompt_div_1\" class=\"ms-4 mt-3\">\n" +
        "    <h5 id=\"slider_question_indicator_"+questionCount+"\">> Question "+questionCount+" (Slider)</h5>\n" +
        "    <div class=\"ms-4\">\n" +
        "      <label for=\"slider_question_input_"+questionCount+"\">Question</label>\n" +
        "      <input id=\"slider_question_input_"+questionCount+"\"/>\n" +
        "      <label for=\"slider_question_max_"+questionCount+"\">Minimum Value</label>\n" +
        "      <input id=\"slider_question_max_"+questionCount+"\" type=\"number\"/>\n" +
        "      <label for=\"slider_question_min_"+questionCount+"\">Maximum Value</label>\n" +
        "      <input id=\"slider_question_min_"+questionCount+"\" type=\"number\"/>\n" +
        "    </div>\n" +
        "  </div>"

    let parentDiv = document.createElement("div");
    parentDiv.innerHTML = slDivHtml;

    questionsDiv.appendChild(parentDiv);
}

// function to add possible responses to multiple choice questions
function addMultipleChoiceResponsePrompt(mcParentDiv){
    let random_id = Date.now();
    let mcrDivHtml = "<div id=\"mc_prompt"+random_id+"_response_div_"+questionCount+"\" class=\"ms-5 mt-3\">\n" +
        "      <h5 id=\"mc_question"+random_id+"_response_indicator_"+Date.now()+"\">Response</h5>\n" +
        "      <label for=\"mc_question"+random_id+"_response_input_"+Date.now()+"\">Response</label>\n" +
        "      <input id=\"mc_question"+random_id+"_response_input_"+Date.now()+"\"/>\n" +
        "    </div>\n"

    let holderDiv = document.createElement("div");
    holderDiv.innerHTML = mcrDivHtml;

    document.getElementById(mcParentDiv.id).appendChild(holderDiv);
}