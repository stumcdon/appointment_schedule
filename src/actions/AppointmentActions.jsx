var alt = require('../alt');

// This class simply stores the actions that will be dispatched to
// enact changes in a store that binds to these actions.
class AppointmentActions {

	// Notifies the store that new reservee information should be
	// stored for the currently selected appointment.
	updateAppointmentReservee(reservee) {
		return reservee;
	}

	// Notifies the store that a new appointment is to be considered
	// the currently selected appointment to operate on.
	updateSelectedAppointment(apptId) {
		return apptId;
	}
}

module.exports = alt.createActions(AppointmentActions);