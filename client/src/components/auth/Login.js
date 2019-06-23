import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from './../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const changed = event => setFormData({ ...formData, [event.target.name]: event.target.value });

	const submitForm = event => {
		event.preventDefault();
		login(email, password);
	};

	//   !!!         REDIRECT      !!! if logged in
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<React.Fragment>
			<h1 className="large text-primary">My Account </h1>
			<p className="lead">
				<i className="fas fa-user" /> Login To Your Account
			</p>
			<form className="form" onSubmit={async event => submitForm(event)}>
				<div className="form-group">
					<input
						required
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={event => changed(event)}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						value={password}
						onChange={event => changed(event)}
					/>
				</div>

				<input type="submit" className="btn btn-primary" value="login" />
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Register now</Link>
			</p>
		</React.Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
