import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({ profile: { status, company, location, website, social, user: { name, avatar } } }) => {
	return (
		<div className="profile-top bg-primary p-2">
			<img src={avatar} alt={name} className="round-img my-1" />
			<h1 className="large my-1">{name}</h1>
			<p className="lead">
				{status}
				{company && <span>{` at ${company}`}</span>}
			</p>
			<p>{location}</p>

			<icons is="i">
				{/* Fake profiles no working links leaving as is for display */}

				<i className="fab fa-twitter fa-2x" />

				<i className="fab fa-facebook fa-2x" />

				<i className="fab fa-linkedin fa-2x" />

				<i className="fab fa-instagram fa-2x" />
			</icons>

			{website && (
				<p className="text-light-orange">
					<i className="fas fa-globe" /> {website}
				</p>
			)}
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileTop;
