import React, { useState, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from './../../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});
	// Not needed diff from course
	//const [toDataDisabled, setToggleDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const change = useCallback(
		event => {
			setFormData({ ...formData, [event.target.name]: event.target.value });
		},
		[formData]
	);

	const setCurrent = () => {
		if (formData.current === false) {
			formData.to = '';
		}
		setFormData({ ...formData, current: !current });
	};

	const submit = event => {
		event.preventDefault();
		addExperience(formData, history);
	};

	return (
		'',
		(
			<React.Fragment>
				<h1 className="large text-primary">Add An Experience</h1>
				<p className="lead">
					<i className="fas fa-code-branch" /> Add any developer/programming positions that you have had in
					the past
				</p>
				<small>* = required field</small>
				<form className="form" onSubmit={submit}>
					<div className="form-group">
						<input
							type="text"
							placeholder="* Job Title"
							name="title"
							required
							value={title}
							onChange={change}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="* Company"
							name="company"
							required
							value={company}
							onChange={change}
						/>
					</div>
					<div className="form-group">
						<input type="text" placeholder="Location" name="location" value={location} onChange={change} />
					</div>
					<div className="form-group">
						<h4>From Date</h4>
						<input type="date" name="from" value={from} onChange={change} />
					</div>
					<div className="form-group">
						<p>
							<input
								type="checkbox"
								name="current"
								value={current}
								checked={current}
								onChange={setCurrent}
							/>
							Current Job
						</p>
					</div>
					<div className="form-group">
						<h4>To Date</h4>
						<input type="date" name="to" value={to} onChange={change} disabled={current} />
					</div>
					<div className="form-group">
						<textarea
							name="description"
							cols="30"
							rows="5"
							placeholder="Job Description"
							value={description}
							onChange={change}
						/>
					</div>
					<input type="submit" className="btn btn-primary my-1" />
					<Link className="btn btn-light my-1" to="/dashboard">
						Go Back
					</Link>
				</form>
			</React.Fragment>
		)
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience));
