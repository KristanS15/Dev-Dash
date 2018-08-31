export function setHomedir(homedir) {
    return function(dispatch) {
        dispatch({type: "SET_HOMEDIR", payload: homedir})
    }
}
