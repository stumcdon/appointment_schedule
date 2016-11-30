var React = require('react');

var AppointmentActions = require('../actions/AppointmentActions.jsx');

// Define a component to represent an Appointment slot in the UI.
// The data to populate in the UI of the appointment slot comes from
// props from a parent component.
var AppointmentSlot = React.createClass({

	// Renders the time, name, and phone number data for an appointment to the UI.
	render () {
		var appt = this.props.appointment;
		return <span className='hoverable appt-slot' 
			data-toggle="modal" 
			data-target="#update-modal"
			onClick={this.onClick}>{
				appt.timeslot + (appt.reserved ? " with " + appt.reservee.name + " at " + appt.reservee.phone : "")
			}
			</span>;
	},

	// When the appointment slot is clicked on, tell the AppointmentStore that
	// this is the new currently selected appointment.
	onClick () {
		AppointmentActions.updateSelectedAppointment(this.props.appointment);
	}
});

module.exports = AppointmentSlot;