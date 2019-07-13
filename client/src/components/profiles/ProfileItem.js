import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profiles: { user: { _id, name, avatar }, status, company, location, skills } }) => {
	const loadedFields = (
		<React.Fragment>
			<div className="profile bg-light">
				<img src={avatar} alt={name} className="round-img" />
				<div>
					<h2>{name}</h2>
					<p>
						{status}
						{company && <span>at: {company}</span>}
					</p>
					<p className="my-1">{location && <span>{location}</span>}</p>
					<Link to={`/profile/${_id}`} className="btn btn-primary">
						View Profile
					</Link>
				</div>

				<ul>
					{skills.slice(0, 4).map((skill, index) => {
						return (
							<li key={index} className="text-primary">
								<i className="fas fa-check" /> {skill}
							</li>
						);
					})}
				</ul>
			</div>
		</React.Fragment>
	);
	return loadedFields;
};

ProfileItem.propTypes = {
	profiles: PropTypes.object.isRequired
};

export default ProfileItem;
