import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from './../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;
	/* 	changed explained for future ref:
		[e.target.name] from e || event v-js : document event listner. target.name so it is dynamic. e.target.value same from value attr. Then just set from Hook.
	*/
	const changed = event => setFormData({ ...formData, [event.target.name]: event.target.value });

	// Personal test: useEffect / side effect
	//useEffect(() => console.log(formData), [formData]);

	// form submit func
	const submitForm = event => {
		event.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			console.log('SUCCESS');
		}
	};

	return (
		<React.Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user" /> Create Your Account
			</p>
			<form className="form" onSubmit={async event => submitForm(event)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						required
						onChange={event => changed(event)}
					/>
				</div>
				<div className="form-group">
					<input
						required
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={event => changed(event)}
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a Gravatar email
					</small>
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
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						value={password2}
						onChange={event => changed(event)}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</React.Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Register);
/* 
connect(state, Object{ actions } )

allows props.action

*/
