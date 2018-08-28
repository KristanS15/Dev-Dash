import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Dash extends Component {
	render() {
		return (
			<div className="hero">
				<h1 className="title is-1">Dev-Dash</h1>
				<NavLink to="/settings">Go to Settings</NavLink>
			</div>
		);
	}
}

export default Dash;
