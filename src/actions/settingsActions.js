const electron = window.require('electron');
const path = require('path');
const fs = electron.remote.require('fs');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const filePath = path.join(userDataPath, "user-settings" + '.json');

export function fetchSettings() {
    return function(dispatch) {
        fs.readFile(filePath, "utf8",  (err, data)  => {
			if (err) throw err;
            const obj = JSON.parse(data);
            dispatch({type: "SETTINGS_FETCHED", payload: obj})
        });
    }
}

export function saveSettings(state) {
    return function(dispatch) {
        let new_data = JSON.stringify(state);
        fs.writeFileSync(filePath, new_data);
        dispatch({type: "SETTINGS_SAVED", payload: state})
    }
}

// export function deleteBuild(key) {
//     return function(dispatch) {
//         var data = fs.readFileSync(filePath, 'utf-8');
//         data = JSON.parse(data);
//         delete data.builds[key];
//         fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
//         dispatch({type: "BUILD_DELETED", payload: data})
//     }
// }
