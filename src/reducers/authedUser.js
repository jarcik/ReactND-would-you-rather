import { SET_AUTHED_USER, NOT_SET_AUTHED_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
    switch (action.type) {
        //log in user
        case SET_AUTHED_USER:
            return action.user;
        //log out user
        case NOT_SET_AUTHED_USER:
            return null;
        default:
            return state;
    }
}