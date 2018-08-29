import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import 'bulma/css/bulma.css'
import Nav from './components/Nav';
import Dash from './components/Dash';
import Settings from './components/Settings';

class App extends Component {
	render() {
		return (
			<HashRouter>
				<div>
					<div className="columns">
						<Nav />
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

export default App;
