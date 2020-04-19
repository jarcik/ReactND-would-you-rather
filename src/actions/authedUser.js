export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const NOT_SET_AUTHED_USER = 'NOT_SET_AUTHED_USER';

//log in a user
function setAuthedUser(user) {
    return {
        type: SET_AUTHED_USER,
        user
    }
}

//log out a user
function notSetAuthedUser() {
    return {
        type: NOT_SET_AUTHED_USER,
    }
}