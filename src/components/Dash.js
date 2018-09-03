import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBuild } from '../actions/buildActions';

const { shell } = window.require('electron');
const ipcRenderer = window.require('electron').ipcRenderer;

class Dash extends Component {
	constructor(props) {
		super(props);
		this.handleBuildChange = this.handleBuildChange.bind(this);
		this.openLocalFinderPath = this.openLocalFinderPath.bind(this);
		this.openLocalTerminalPath = this.openLocalTerminalPath.bind(this);
		this.openSSHTerminalPath = this.openSSHTerminalPath.bind(this);

		this.state = {
			chosen_build: ""
		};
	}

	handleBuildChange(e) {
		e.preventDefault();
		this.setState({
			...this.state,
			chosen_build: e.target.value
		});
		this.props.dispatch(getBuild(e.target.value))
	}

	makeAbsolutePath(location) {
		location = location.replace('~', this.props.homedir);

		// Get vagrant folder
		let vagrant_location = this.props.settings.builds[this.state.chosen_build].location;
		vagrant_location = vagrant_location.split('/');
		vagrant_location.pop();
		vagrant_location = vagrant_location.join('/');

		location = location.replace('./', vagrant_location + '/');

		return location;
	}

	openLocalFinderPath(e, location) {
		e.preventDefault();
		location = this.makeAbsolutePath(location);
		shell.openItem(location);
	}

	openLocalTerminalPath(e, location) {
		e.preventDefault();
		location = this.makeAbsolutePath(location);
		ipcRenderer.send('localTerminal', location);
	}

	openSSHTerminalPath(e, location) {
		e.preventDefault();
		console.log("ssh terminal: " + location);
	}

	render() {
		let build_options = {}
		if(this.props.settings.builds) {
			build_options = Object.entries(this.props.settings.builds).map(([i, build]) => {
				return (
					<option value={ i } key={ i }>{ build.name }</option>
				)
			});
		}

		let folders = (
			<tr>
				<td colSpan="2">No folders found in build.</td>
			</tr>
		);
		if(this.props.build.folders) {
			folders = Object.entries(this.props.build.folders).map(([i, folder]) => {
				return (
					<tr key={ i }>
						<td>
							<div className="columns">
								<div className="column is-half">{ folder[0] }:</div>
								<div className="column is-one-quarter"><a onClick={ (e) => this.openLocalFinderPath(e, folder[0]) }>Finder</a></div>
								<div className="column is-one-quarter"><a onClick={ (e) => this.openLocalTerminalPath(e, folder[0]) }>Terminal</a></div>
							</div>
						</td>
						<td>
							<a onClick={ (e) => this.openSSHTerminalPath(e, folder[1]) }>{ folder[1] }</a>
						</td>
					</tr>
				)
			});
		}

		return (
			<div>
				<div className="columns dev-dash">
					<div className="column dev-dash-select">
						{ build_options.length ? 
							<div className="field">
								<div className="control">
									<div className="select is-fullwidth">
											<select defaultValue="default" onChange={this.handleBuildChange}>
												<option value="default" disabled>Select build...</option>
												{ build_options } 
											</select>
									</div>
								</div>
							</div>
						:
							<p>You currently have no builds...</p>
						}
					</div>
					<div className="column">
						{ this.props.build.folders.length &&
							<table className="table is-bordered is-striped is-hoverable is-fullwidth">
								<thead>
									<tr>
										<th>Local Folder</th>
										<th>Synced Folder</th>
									</tr>
								</thead>
								<tbody>
									{ folders }
								</tbody>
							</table>
						}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        settings: state.settings,
		build: state.build,
		homedir: state.homedir.homedir
    }
}

export default connect(mapStateToProps)(Dash);