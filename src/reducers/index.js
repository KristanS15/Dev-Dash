import { combineReducers } from 'redux';

import settings from './settingsReducer';
import build from './buildReducer';
import homedir from './homedirReducer';

export default combineReducers({
    settings,
    build,
    homedir
});