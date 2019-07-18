import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
	const authLinks = (
		<ul>
			{/* I wanted to see who was logged in, small edit
			!null should be true and nothing gets loaded unitl loading is false and auth is true, I don't think !null is an issue */}
			<li>{user !== null ? user.name : !null}</li>
			<li>
				<Link to="/profiles">
					<span className="hide-sm m-0">Developers</span>
					<i className="fas fa-address-book" />
				</Link>
			</li>
			<li>
				<Link to="/posts">
					<span className="hide-sm m-0">Posts</span> <i className='fas fa-thumbtack'></i>
				</Link>
			</li>
			<li>
				<Link to="/dashboard">
					<span className="hide-sm m-0">Dashboard</span>
					<i className="fas fa-user-circle" />
				</Link>
			</li>
			<li>
				<a href="#!" onClick={logout}>
					<span className="hide-sm m-0">Logout</span>
					<i className="fas fa-sign-out-alt" />
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fas fa-code" /> DevConnector
				</Link>
			</h1>
			{!loading && <React.Fragment>{isAuthenticated ? authLinks : guestLinks}</React.Fragment>}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
// state, actions : reminder
