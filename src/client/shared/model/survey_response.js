class SurveyResponse{
    // id is the id for a SurveyResponse. Should be the same id as the id for the survey.
    // uid is the id of the person sending the response for the survey.
    // NOTE id concatenated to uid should make the primary key that is used in the database.
    constructor(id, sid, uid, responses) {
        this.id = id;
        this.uid = uid;
        this.responses = responses;
    }

    getId(){
        return this.id;
    }

    getUid(){
        return this.uid;
    }

    // return JSON object of responses. See src/shared/example/set_of_responses.json for an example
    getResponses(){
        return this.responses;
    }
}