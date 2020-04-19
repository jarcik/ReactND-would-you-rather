import { ADD_QUESTION, SAVE_ANSWER_QUESTION, RECIEVE_QUESTIONS } from '../actions/questions';

export default function questions(state = {}, action) {
    switch (action.type) {
        //adding new qustion
        case ADD_QUESTION:
            return {
                ...state,
                [action.qustions.id]: action.question
            }
        //saving the answer of the questoin
        case SAVE_ANSWER_QUESTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }

                }
            }
        //getting all questions
        case RECIEVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        default:
            return state
    }
}