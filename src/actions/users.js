
export const SAVE_ANSWER_QUESTION_USER = 'SAVE_ANSWER_QUESTION_USER';
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER';
export const RECIEVE_USERS = 'RECIEVE_USERS';

//for users data: save the answer for the question
export function saveAnswerQuestionUser(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER_QUESTION_USER,
        authedUser,
        qid,
        answer
    }
}

//for users data: add new question
export function addQuestionUser(authedUser, qid) {
    return {
        type: ADD_QUESTION_USER,
        authedUser,
        qid
    }
}

//for users data: get all users
export function recieveUsers(users) {
    return {
        type: RECIEVE_USERS,
        users
    }
}