import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api';
import { recieveUsers, saveAnswerQuestionUser, addQuestionUser } from '../actions/users';
import { recieveQuestions, saveAnswerQuestion, addQuestion } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';
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
                dispatch(setAuthedUser('sarahedo'))
                dispatch(hideLoading())
            })
    }
}

//handle the adding new question
//here because of interacting with both questions and users actions
export function handleAddQuestion(optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        }).then((question) => {
            dispatch(addQuestion(question));
            dispatch(addQuestionUser(authedUser, question.id))
        })

    }
}

//handle the answering the question
//here because of interacting with both questions and users actions
export function handleAnswerQuestion(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        saveQuestionAnswer({authedUser, qid, answer})
            .then(() => {
                dispatch(saveAnswerQuestion(authedUser, qid, answer));
                dispatch(saveAnswerQuestionUser(authedUser, qid, answer))
            })
    }
}