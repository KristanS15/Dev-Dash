import React, { Component } from 'react';

const electron = window.require('electron');
const path = require('path');
const fs = electron.remote.require('fs');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const filePath = path.join(userDataPath, "user-settings" + '.json');

class Settings extends Component {
	constructor(props) {
		super(props);
		this.resetForm = this.resetForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			terminal: "iTerm",
			editor: "VSCode"
		}
	}

	componentDidMount() {
		this.resetForm();
	}

	resetForm() {
		fs.readFile(filePath, "utf8",  (err, data)  => {
			if (err) throw err;
			const obj = JSON.parse(data);
			this.setState(obj);
		});
	}

	handleInputChange(e) {
        this.setState({
			...this.state,
			[e.target.name]: e.target.value
        });
    }

	handleSubmit(e) {
		e.preventDefault();
		fs.writeFileSync(filePath, JSON.stringify(this.state));
	}

	render() {
		return (
			<div>
				<h1 className="title is-1">Settings</h1>
				<form onSubmit={ this.handleSubmit }>
					<div className="columns">
						<div className="column">
							<div class="field">
								<label class="label">Terminal</label>
								<div class="control">
									<input class="input" type="text" placeholder="iTerm" name="terminal" value={ this.state.terminal } onChange={ this.handleInputChange } />
								</div>
							</div>
						</div>
						<div className="column">
							<div class="field">
								<label class="label">Editor</label>
								<div class="control">
									<input class="input" type="text" placeholder="VSCode" name="editor" value={ this.state.editor } onChange={ this.handleInputChange } />
								</div>
							</div>
						</div>
					</div>
					<div class="field is-grouped">
						<div class="control">
							<input type="submit" className="button is-link" value="Submit" />
						</div>
						<div class="control">
							<button class="button is-text" onClick={ this.resetForm }>Reset to last save</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Settings;
