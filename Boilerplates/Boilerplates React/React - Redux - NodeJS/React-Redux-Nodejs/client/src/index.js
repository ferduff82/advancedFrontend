/* React Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import { BrowserRouter } from 'react-router-dom';

/* Redux Dependencies */
import { Provider } from 'react-redux'
import store from './store/configureStore';

/* Global Styles */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './styles/index.scss';

/* Components */
import Maps from './components/Maps.js';
import IndexApp from './components/App';
import DelayedComponent from './components/DelayedPages/DelayedComponent';

/* App Routing */
const PrimaryLayout = () => (
	<div className="primary-layout">
		<main>
			<Route path="/" exact component={IndexApp} />	
			<Route path="/geotracker" render={() => <Maps />} />
			<Route path="/id" render={(props) => <DelayedComponent {...props} page="id" collection="auth" />} />
			<Route path="/service" render={(props) => <DelayedComponent {...props} page="service" collection="auth" />} />
			<Route path="/monitoring-on-time" render={(props) => <DelayedComponent {...props} page="monitor" collection="auth" />} />
			<Route path="/outcome" render={(props) => <DelayedComponent {...props} page="outcome" collection="auth" />} />
			<Route path="/free" render={(props) => <DelayedComponent {...props} page="free" collection="providers_auth" />} />
			<Route path="/att" render={(props) => <DelayedComponent {...props} page="att" collection="providers" />} />
			<Route path="/preassigned" render={(props) => <DelayedComponent {...props} page="preassigned" collection="providers" />} />
			<Route path="/assigned" render={(props) => <DelayedComponent {...props} page="assigned" collection="providers" />} />
		</main>
	</div>
)

const Main = () => (
	<BrowserRouter basename="/dashboard">
		<Provider store={store()}>
			<PrimaryLayout />
		</Provider>
	</BrowserRouter>
)

ReactDOM.render(<Main />, document.getElementById('root'));
