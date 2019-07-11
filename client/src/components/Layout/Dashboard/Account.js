import React from 'react';
import PropTypes from 'prop-types';
import { deleteAccount } from './../../../actions/profile';
import { connect } from 'react-redux';

const Account = ({ account, deleteAccount }) => {
	return (
		<div className="my-2">
			<button onClick={() => deleteAccount()} className="btn btn-danger">
				<i className="fas fa-user" /> Delete My Account
			</button>
		</div>
	);
};

Account.propTypes = {
	deleteAccount: PropTypes.func.isRequired
};

export default connect(null, { deleteAccount })(Account);
