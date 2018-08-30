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
            let payload = JSON.parse(action.payload);
            return {
                terminal: payload.terminal,
                editor: payload.editor,
                builds: payload.builds
            };
        }
        default: {
            return state;
        }
    }
}