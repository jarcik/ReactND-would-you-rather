import { _saveQuestion, 
    _saveQuestionAnswer,
    _getQuestions,
    _getUsers } from './_DATA.js';

export function getInitialData() {
    return Promise.all([
        _getQuestions(),
        _getUsers()
    ]).then(([questions, users]) => ({
        questions,
        users
    }))
}

export function saveQuestion(question) {
    return _saveQuestion(question);
}

export function saveQuestionAnswer({ authedUser, qid, answer }) {
    return _saveQuestionAnswer({ authedUser, qid, answer });
}