import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const changed = event => setFormData({ ...formData, [event.target.name]: event.target.value });

	const submitForm = event => {
		event.preventDefault();
		console.log('SUCCESS');
	};

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

export default Login;
