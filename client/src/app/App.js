import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './../components/Layout/NavBar/Navbar';
import Landing from '../components/Layout/Landing/Landing';
import Login from './../components/auth/Login';
import Register from './../components/auth/Register';
import Alerts from './../components/Utils/alerts/Alerts';
import Dashboard from './../components/Layout/Dashboard/Dashboard';
import PrivateRoute from '../components/routing/PrivateRoute';
import CreateProfile from './../components/Layout/Profile-Form/CreateProfile';
import EditProfile from './../components/Layout/Profile-Form/EditProfile';
import AddExperience from './../components/Layout/Profile-Form/AddExperience';
import AddEducation from './../components/Layout/Profile-Form/AddEduction';
import Profiles from './../components/profiles/Profiles';
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
							<Route exact path="/profiles" component={Profiles} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute exact path="/create-profile" component={CreateProfile} />
							<PrivateRoute exact path="/edit-profile" component={EditProfile} />
							<PrivateRoute exact path="/add-experience" component={AddExperience} />
							<PrivateRoute exact path="/add-education" component={AddEducation} />
						</Switch>
					</section>
				</React.Fragment>
			</Router>
		</Provider>
	);
};

export default App;
