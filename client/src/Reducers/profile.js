import {
	GET_PROFILE_BY_ID,
	GET_PROFILE,
	PROFILE_ERROR,
	PROFILE_BY_ID_ERROR,
	CURRENT_PROFILE_ERROR,
	LOGOUT,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_PROFILES,
	GET_REPOS
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
		case GET_PROFILE_BY_ID:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false
			};
		case PROFILE_ERROR:
		case PROFILE_BY_ID_ERROR:
		case CURRENT_PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case LOGOUT:
		case ACCOUNT_DELETED:
			return initialState;
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false
			};
		case GET_REPOS:
			return {
				...state,
				repos: payload,
				loading: false
			};
		default:
			return state;
	}
}
