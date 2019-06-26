import React from 'react';
import { Link } from 'react-router-dom';

const Dashcomp = ({ user, profile, loading }) => {
	const noProfile = (
		<React.Fragment>
			<p>You have not yet setup a profile, please add some info</p>
			<Link to="/create-profile" className="btn btn-primary my-1">
				Create Profile
			</Link>
		</React.Fragment>
	);

	const hasProfile = (
		<React.Fragment>
			<div className="dash-buttons">
				<a href="edit-profile.html" className="btn btn-light">
					<i className="fas fa-user-circle text-primary" /> Edit Profile
				</a>
				<a href="add-experience.html" className="btn btn-light">
					<i className="fab fa-black-tie text-primary" /> Add Experience
				</a>
				<a href="add-education.html" className="btn btn-light">
					<i className="fas fa-graduation-cap text-primary" /> Add Education
				</a>
			</div>

			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Tech Guy Web Solutions</td>
						<td className="hide-sm">Senior Developer</td>
						<td className="hide-sm">02-03-2009 - 01-02-2014</td>
						<td>
							<button className="btn btn-danger">Delete</button>
						</td>
					</tr>
					<tr>
						<td>Traversy Media</td>
						<td className="hide-sm">Instructor & Developer</td>
						<td className="hide-sm">02-03-2015 - Now</td>
						<td>
							<button className="btn btn-danger">Delete</button>
						</td>
					</tr>
				</tbody>
			</table>

			<h2 className="my-2">Education Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th className="hide-sm">Degree</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Northern Essex</td>
						<td className="hide-sm">Associates</td>
						<td className="hide-sm">02-03-2007 - 01-02-2009</td>
						<td>
							<button className="btn btn-danger">Delete</button>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="my-2">
				<button className="btn btn-danger">
					<i className="fas fa-user-minus" />
					Delete My Account
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user-circle" /> Welcome {user && user.name}
			</p>
			{profile !== null ? hasProfile : noProfile}
		</React.Fragment>
	);
};

export default Dashcomp;
