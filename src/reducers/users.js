import { ADD_QUESTION_USER, SAVE_ANSWER_QUESTION_USER, RECIEVE_USERS } from '../actions/users';

export default function users(state = {}, action) {
    switch (action.type) {
        //adding new qustion for the user
        case ADD_QUESTION_USER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.qid])
                }
            }
        //saving the answer of the questoin for the user
        case SAVE_ANSWER_QUESTION_USER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        //getting all users
        case RECIEVE_USERS:
            return {
                ...state,
                ...action.users
            }
        default:
            return state
    }
}