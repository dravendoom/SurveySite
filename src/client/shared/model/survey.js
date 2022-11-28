class Survey{

    // questions is a JSON object containing an array of questions
    // where every question has an array of answers. See src/shared/example/set_of_questions.json for an example
    constructor(id, title, questions) {
        this.id = id;
        this.title = title;
        this.questions = questions;
    }

    // adds a single question to the Survey
    // should pass a question JSON object with an array of answers. See src/shared/example/question.json for an example
    addQuestion(question){

    }

    // GETTERS
    getId(){
        return this.id;
    }

    getTitle(){
        return this.title;
    }

    getQuestion(questionNumber){
        return this.questions[questionNumber];
    }

    // returns JSON array of questions objects. See src/shared/example/set_of_questions.json for an example
    getQuestions(){
        return this.questions;
    }

}