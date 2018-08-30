import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dash extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			build: ''
		};

		this.handleBuildChange = this.handleBuildChange.bind(this);
	}

	handleBuildChange(event) {
		this.setState({
			build: event.target.value
		})
	}

	render() {
		let build_options = {}
		if(this.props.settings.builds) {
			build_options = Object.entries(this.props.settings.builds).map(([i, build]) => {
				return (
					<option key={ i }>{ build.name }</option>
				)
			});
		}

		return (
			<div>
				<div className="columns dev-dash">
					<div className="column dev-dash-select">
						<div className="field">
							<div className="control">
								<div className="select is-fullwidth">
									<select defaultValue="default" onChange={this.handleBuildChange}>
										<option value="default" disabled>Select build...</option>
										{build_options ? build_options : ''}
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="column">
						<h1 className="title is-1">Dev-Dash: { this.state.build }</h1>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        settings: state.settings,
    }
}

export default connect(mapStateToProps)(Dash);