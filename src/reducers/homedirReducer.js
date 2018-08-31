export default function homedir(state = {
    homedir: ""
}, action) {
    switch(action.type) {
        case "SET_HOMEDIR": {
            return {
                ...state,
                homedir: action.payload
            };
        }
        default: {
            return state;
        }
    }
}