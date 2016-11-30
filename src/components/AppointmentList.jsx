var React = require('react');
var AppointmentSlot = require('./AppointmentSlot.jsx');

// This component creates a <ul> element to hold a list of AppointmentSlot
// components, passing in the current values for that appointment as a prop.
var AppointmentList = React.createClass({

	render () {
		return (
			<ul className="list-group">
				{
					this.props.appointments.map((appt, i) => {
						var classes = "list-group-item";
						// If this appointment is already reserved, color the list item red.
						if (appt.reserved) classes += " list-group-item-danger";
						return (
							<li key={i} className={classes}>
								<AppointmentSlot appointment={appt} />
							</li>
						);
					})
				}
			</ul>
		);
	}
});

module.exports = AppointmentList;