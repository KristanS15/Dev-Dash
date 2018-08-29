import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Nav extends Component {
	render() {
		return (
            <aside class="menu column is-one-fifth main-nav">
                <ul class="menu-list">
                    <li><Link to="/">Dev-Dash</Link></li>
                    <li><Link to="/">Notes</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </aside>
		);
	}
}

export default Nav;
