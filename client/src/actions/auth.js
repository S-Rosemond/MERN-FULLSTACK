import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from './../utils/setAuthToken';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

// Load User
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		localStorage.removeItem('token');
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post('/api/users', body, config);

		const { token } = res.data;

		localStorage.setItem('token', token);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
		// Dispatch if successful
		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach(element => dispatch(setAlert(element.msg, 'danger')));
		}

		localStorage.removeItem('token');

		dispatch({
			type: REGISTER_FAIL
		});
	}
};

// Login User
export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/auth', body, config);

		const { token } = res.data;

		localStorage.setItem('token', token);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});
		// Dispatch load user after success
		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach(element => dispatch(setAlert(element.msg, 'danger')));
		}

		localStorage.removeItem('token');

		dispatch({
			type: LOGIN_FAIL
		});
	}
};

// Logout / clear profile
export const logout = () => dispatch => {
	localStorage.removeItem('token');
	dispatch({ type: LOGOUT });
	// Course dispatched CLEAR_PROFILE HERE
	// I used LOGOUT in profile and set profile to intial state
};
