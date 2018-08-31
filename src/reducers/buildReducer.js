export default function admin(state = {
    folders: {}
}, action) {
    switch(action.type) {
        case "BUILD_FETCHED": {
            return {
                ...state,
                folders: action.payload
            };
        }
        default: {
            return state;
        }
    }
}