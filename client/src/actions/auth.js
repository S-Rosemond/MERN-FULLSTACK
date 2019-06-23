import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

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
		//
		const { token } = res.data;
		// REMOVE THIS
		// console.log(token);
		console.log(res.data);
		// END
		localStorage.setItem('token', token);

		// const getItem = localStorage.getItem('token');
		// console.log(getItem);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
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
