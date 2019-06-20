import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './../components/Layout/NavBar/Navbar';
import Landing from '../components/Layout/Landing/Landing';
import Login from './../components/auth/Login';
import Register from './../components/auth/Register';

const App = () => (
	<Router>
		<React.Fragment>
			<Navbar />
			<Route exact path="/" component={Landing} />
			<Switch>
				<section className="container">
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</section>
			</Switch>
		</React.Fragment>
	</Router>
);

export default App;
