import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

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
		return (
			<div>
				<div className="columns dev-dash">
					<div className="column dev-dash-select">
						<div class="field">
							<div class="control">
								<div class="select is-fullwidth">
									<select defaultValue="value" onChange={this.handleBuildChange}>
										<option value="default" disabled>Select build...</option>
										<option>Grapefruit</option>
										<option>Lime</option>
										<option>Coconut</option>
										<option>Mango</option>
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

export default Dash;
