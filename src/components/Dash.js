import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBuild } from '../actions/buildActions';

class Dash extends Component {
	constructor(props) {
		super(props);
		this.handleBuildChange = this.handleBuildChange.bind(this);
	}

	handleBuildChange(e) {
		e.preventDefault();
		this.props.dispatch(getBuild(e.target.value))
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
					<tr>
						<td>{ folder[0] }</td>
						<td>{ folder[1] }</td>
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
						<h1 className="title is-1">Dev-Dash</h1>
						{ this.props.build.folders.length ? 
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
						:
							<p>folders not found!</p>
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
    }
}

export default connect(mapStateToProps)(Dash);