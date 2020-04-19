export const SAVE_ANSWER_QUESTION = 'SAVE_ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';
export const RECIEVE_QUESTIONS = 'RECIEVE_QUESTIONS';

//for questions data: save the answer for the question
export function saveAnswerQuestion(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

//for qustions data: add new question
export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

//for questions data: get all questions
export function recieveQuestions(questions) {
    return {
        type: RECIEVE_QUESTIONS,
        questions
    }
}