export default function admin(state = {
    terminal: '',
    editor: '',
    builds: {}
}, action) {
    switch(action.type) {
        case "SETTINGS_FETCHED": {
            return {
                ...state,
                terminal: action.payload.terminal,
                editor: action.payload.editor,
                builds: action.payload.builds
            };
        }
        case "SETTINGS_SAVED": {
            return state;
        }
        default: {
            return state;
        }
    }
}