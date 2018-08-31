import { combineReducers } from 'redux';

import settings from './settingsReducer';
import build from './buildReducer';

export default combineReducers({
    settings,
    build
});