import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSettings } from './actions/settingsActions';
import { setHomedir } from './actions/homedirActions';
import 'bulma/css/bulma.css'
import Nav from './components/Nav';
import Dash from './components/Dash';
import Settings from './components/Settings';

const ipcRenderer = window.require('electron').ipcRenderer;

class App extends Component {
	constructor(props) {
		super(props);
		
		ipcRenderer.on('homedir', function (event,homedir) {
			props.dispatch(setHomedir(homedir));
		});
	}

	componentWillMount() {
		this.props.dispatch(fetchSettings());
	}

	render() {
		return (
			<HashRouter>
				<div>
					<div className="columns content-container">
						<div className="column is-one-fifth sidebar">
							<Nav />
						</div>
						<div className="column top-column">
							<Route exact path="/" component={ Dash }/>
							<Route exact path="/settings" component={ Settings }/>
						</div>
					</div>
				</div>
			</HashRouter>
		);
	}
}

function mapStateToProps(state) {
    return {
        settings: state.settings,
    }
}

export default connect(mapStateToProps)(App);