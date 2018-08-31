const electron = window.require('electron');
const path = require('path');
const fs = electron.remote.require('fs');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const filePath = path.join(userDataPath, "user-settings" + '.json');

export function getBuild(key) {
    return function(dispatch) {
        fs.readFile(filePath, "utf8",  (err, data)  => {
            if (err) throw err;
            let obj = JSON.parse(data);
            dispatch(getBuildData(obj.builds[key].location));
        });
    }
}

function getBuildData(location) {
    return function(dispatch) {
        fs.readFile(location, "utf8",  (err, data)  => {
            if (err) throw err;

            // This regex looks for all the synced folder in the chosen VagrantFile
            var myRegexp = /^\s*config.vm.synced_folder\s*(.*)(?=, type)/gm;
            let match = myRegexp.exec(data);
            let clean_data = [];
            while (match != null) {
                let found = match[1];
                
                var split_data = found.trim().split(',');
                var trim_data = split_data.map(element => {
                    return element.replace(/['"]+/g, '').trim();
                });

                clean_data.push(trim_data);

                match = myRegexp.exec(data);
            }

            return dispatch({type: "BUILD_FETCHED", payload: clean_data})
        });
    }
}
