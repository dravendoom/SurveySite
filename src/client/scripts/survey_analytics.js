let surveyTitleHeader = document.getElementById("survey_analytics_survey_title");
let surveyDateCreatedText = document.getElementById("survey_analytics_date_created");
let surveyRespondentsNumberText = document.getElementById("survey_analytics_number_of_respondents");
let surveyAnalyticsHolderDiv = document.getElementById("survey_analytics_all_questions_div");
let surveyAnalyticsHeader = document.getElementById("survey_analytics_question_analytics_header");

getAnalyticsFromServer();

function getAnalyticsFromServer(){
    let surveyIdRegex = RegExp("\\?.*");
    let surveyId = surveyIdRegex.exec(window.location.href)[0].replace("?","");
    socket.emit("query_survey_analytics", surveyId);
    socket.on("query_survey_analytics_result", (surveyAnalytics)=>{
        if(surveyAnalytics.result) {
            implementAnalyticsLayout(surveyAnalytics);
        } else {
            surveyTitleHeader.innerText = "Analytics Fetch Error :(";
            surveyAnalyticsHeader.hidden = true;
            surveyDateCreatedText.parentElement.parentElement.hidden = true;
        }
    });
}

function implementAnalyticsLayout(surveyAnalyticsObject){

    let surveyCreatedDateObject = new Date(surveyAnalyticsObject.analytics.dateCreated);
    let dateString = surveyCreatedDateObject.toLocaleDateString();

    surveyTitleHeader.innerText = "Analytics for \"" + surveyAnalyticsObject.title +"\"";
    surveyDateCreatedText.innerText = dateString;
    surveyRespondentsNumberText.innerText = surveyAnalyticsObject.analytics.respondents;

    if(surveyAnalyticsObject.analytics.respondents === 0) {
        surveyAnalyticsHeader.innerText = "No one has responded to your survey. \nCheck back later";
    }

    let i = 1;
    for(let analyticQuestion of surveyAnalyticsObject.analytics.questionAnalytics){
        let questionDiv = document.createElement("div");
        questionDiv.style.marginTop = "10px";

        let qType = analyticQuestion.type === "MULTIPLE_CHOICE" ? "Multiple Choice" : "Slider";

        let questionString = analyticQuestion.question + "<br>" + "<span style='font-size: 12px'>x-axis: value <br> y-axis: # of responses</span>"

        questionDiv.innerHTML = "<h3>Question "+i+" ("+qType+")</h3>\n" +
            "            <span style=\"font-size: 22px\">"+questionString+"</span>";
        let canvas = generateCanvas();

        surveyAnalyticsHolderDiv.append(questionDiv);
        surveyAnalyticsHolderDiv.append(canvas);

        if(analyticQuestion.type === "MULTIPLE_CHOICE"){
            generateBarChart(canvas,
                analyticQuestion.title,
                getMcLabels(analyticQuestion.data),
                getRawMcData(analyticQuestion.data)
            );
        } else if (analyticQuestion.type === "SLIDER"){
            generateScatterPlot(canvas, analyticQuestion.data);
        }
        i++;
    }
}

function generateCanvas(){
    let canvas = document.createElement("canvas");

    canvas.style.maxWidth = "100%";
    canvas.classList.add("ms-large-2");
    canvas.classList.add("me-large-2");

    canvas.responsive = true;

    return canvas;
}

function generateBarChart(canvas, questionTitle, questionLabels, questionData){
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: questionLabels,
            datasets: [
                {
                    label: "Number of responses",
                    data: questionData,
                    borderWidth: 2
                }
            ]
        },
    });
}

function generateScatterPlot(canvas, questionData){
    new Chart(canvas, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: "Responses",
                    borderColor: "#2f006b",
                    borderWidth: 2,
                    data: questionData,
                },
            ]
        }
    });
}

function getMcLabels(questionData){
    let labels = [];
    for(let data of questionData){
        labels.push(data[0]);
    }

    return labels;
}

function getRawMcData(questionData){
    let dataArr = [];
    for(let data of questionData){
        dataArr.push(data[1]);
    }
    return dataArr;
}