import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveSettings } from '../actions/settingsActions';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = props.settings;
		this.resetForm = this.resetForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBuildChange = this.handleBuildChange.bind(this);
		this.handleNewBuild = this.handleNewBuild.bind(this);
	}

	componentWillReceiveProps(newProps) {
		this.setState(newProps.settings)
	}

	resetForm(e) {
		e.preventDefault();
		this.setState(this.props.settings);
	}

	handleInputChange(e) {
        this.setState({
			...this.state,
			[e.target.name]: e.target.value
        });
	}
	
	handleBuildChange(e, key) {
		this.setState({
			...this.state,
			builds: {
				...this.state.builds,
				[key]: {
					...this.state.builds[key],
					[e.target.name]: e.target.value
				}
			}
        });
	}

	handleNewBuild() {
		let count = Object.keys(this.state.builds).length + 1;
		this.setState({
			...this.state,
			builds: {
				...this.state.builds,
				[count]: {
					"name": "",
					"location": "",
					"start": "",
					"connect": "",
				}
			}
		});
	}

	handleSubmit(e) {
		e.preventDefault();
        this.props.dispatch(saveSettings(this.state));
	}
	
	render() {
		let builds = (
			<tr>
				<td colSpan="4">You currently have no builds setup.</td>
			</tr>
		);
		if(this.state.builds) {
			builds = Object.entries(this.state.builds).map(([i, build]) => {
				return (
					<tr key={ i } onChange={ (e) => this.handleBuildChange(e, i) }>
						<td><input className="input" type="text" placeholder="Build name" name="name" defaultValue={ build.name } /></td>
						<td><input className="input" type="text" placeholder="Build location" name="location" defaultValue={ build.location } /></td>
						<td><input className="input" type="text" placeholder="Build start" name="start" defaultValue={ build.start } /></td>
						<td><input className="input" type="text" placeholder="Build connect" name="connect" defaultValue={ build.connect } /></td>
					</tr>
				)
			});
		}

		return (
			<div>
				<h1 className="title is-1">Settings</h1>
				<form onSubmit={ this.handleSubmit }>
					<div className="columns">
						<div className="column">
							<div className="field">
								<label className="label">Terminal</label>
								<div className="control">
									<input className="input" type="text" placeholder="iTerm" name="terminal" defaultValue={ this.state.terminal } onChange={ this.handleInputChange } />
								</div>
							</div>
						</div>
						<div className="column">
							<div className="field">
								<label className="label">Editor</label>
								<div className="control">
									<input className="input" type="text" placeholder="VSCode" name="editor" defaultValue={ this.state.editor } onChange={ this.handleInputChange } />
								</div>
							</div>
						</div>
					</div>

					<hr />

					<div className="columns">
						<div className="column">
							<h2 className="title is-2">Builds</h2>
						</div>
						<div className="column">
							<button className="button is-link is-pulled-right" onClick={ this.handleNewBuild }>New Build</button>
						</div>
					</div>
					<table className="table is-bordered is-striped is-hoverable is-fullwidth">
						<thead>
							<tr>
								<th>Name</th>
								<th>Location</th>
								<th>Start Command</th>
								<th>Connect Command</th>
							</tr>
						</thead>
						<tbody>
							{ builds }
						</tbody>
					</table>
					
					<div className="field is-grouped">
						<div className="control">
							<input type="submit" className="button is-link" value="Save" />
						</div>
						<div className="control">
							<button className="button is-text" onClick={ this.resetForm }>Reset to last save</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        settings: state.settings,
    }
}

export default connect(mapStateToProps)(Settings);