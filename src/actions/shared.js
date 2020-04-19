import { getInitialData } from '../utils/api';
import { recieveUsers, saveAnswerQuestionUser, addQuestionUser } from '../actions/users';
import { recieveQuestions, saveAnswerQuestion, addQuestion } from '../actions/questions';
import { showLoading, hideLoading } from 'react-redux-loading';

//getting all the initial data - all questions and users
//here because of interacting with both questions and users actions
export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ questions, users }) => {
                dispatch(recieveQuestions(questions));
                dispatch(recieveUsers(users));
                dispatch(hideLoading())
            })
    }
}

//handle the adding new question
//here because of interacting with both questions and users actions
export function handleAddQuestion(optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return _saveQuestion({
            optionOne,
            optionTwo,
            author: authedUser
        }).then((question) => {
            dispatch(addQuestion(question));
            dispatch(addQuestionUser(authedUser, question.id))
        })

    }
}

//handle the answering the question
//here because of interacting with both questions and users actions
export function handleAnswerQuestion(qid, option) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        const answer = {
            authedUser,
            qid,
            option
        };
        _saveQuestionAnswer(answer)
            .then(() => {
                dispatch(saveAnswerQuestion(authedUser, qid, option));
                dispatch(saveAnswerQuestionUser(authedUser, qid, option))
            })
    }
}