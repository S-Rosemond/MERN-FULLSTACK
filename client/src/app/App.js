import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './../components/Layout/NavBar/Navbar';
import Landing from '../components/Layout/Landing/Landing';
import Login from './../components/auth/Login';
import Register from './../components/auth/Register';
import Alerts from './../components/Utils/alerts/Alerts';
import Dashboard from './../components/Layout/Dashboard/Dashboard';
import PrivateRoute from '../components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from '../Store/store';
import { loadUser } from './../actions/auth';
import setAuthToken from './../utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<React.Fragment>
					<Navbar />
					<Route exact path="/" component={Landing} />
					<section className="container">
						<Alerts />
						<Switch>
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
					</section>
				</React.Fragment>
			</Router>
		</Provider>
	);
};

export default App;
