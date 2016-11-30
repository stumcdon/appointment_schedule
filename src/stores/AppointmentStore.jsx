// Require the Alt Flux library
var alt = require('../alt');

// Require the actions implemented in the AppointmentActions class
var AppointmentActions = require('../actions/AppointmentActions.jsx');

// This class is used as a store to keep track of the state of our scheduling application.
// Namely, it maintains an array of mock appointment info objects that
// store the following information:
// 		timeslot: a string describing the time of the appointment
//		id:       a unique identifier for the appointment
//		reservee: two strings for name and phone # of the person the appt. is scheduled for
//		reserved: a boolean telling if this appointment slot has been scheduled
//
// The store also maintains the "selectedAppt" value to keep track of the currently
// selected appointment object that the user is working with.
class AppointmentStore {

	constructor () {

		// Mock data to be used for the current iteration of the appointment scheduler.
		// This would be replaced with an API call to a server should the requirements
		// be extended to include a database.
		this.appointments = [
			{timeslot: "9am to 10am",  id: "0", reservee: {name: "", phone: ""}, reserved: false},
			{timeslot: "10am to 11am", id: "1", reservee: {name: "", phone: ""}, reserved: false},
			{timeslot: "11am to 12pm", id: "2", reservee: {name: "", phone: ""}, reserved: false},
			{timeslot: "12pm to 1pm",  id: "3", reservee: {name: "", phone: ""}, reserved: false},
			{timeslot: "1pm to 2pm",   id: "4", reservee: {name: "", phone: ""}, reserved: false},
			{timeslot: "2pm to 3pm",   id: "5", reservee: {name: "", phone: ""}, reserved: false},
			{timeslot: "3pm to 4pm",   id: "6", reservee: {name: "", phone: ""}, reserved: false},
			{timeslot: "4pm to 5pm",   id: "7", reservee: {name: "", phone: ""}, reserved: false}
		];

		// Keep track of the currently selected appointment object. null if there is not one selected
		this.selectedAppt = null;

		// Bind class methods to the actions this store should respond to
		this.bindListeners({
			handleUpdateAppointmentReservee: AppointmentActions.UPDATE_APPOINTMENT_RESERVEE,
			handleUpdateSelectedAppointment: AppointmentActions.UPDATE_SELECTED_APPOINTMENT
		});
	}

	// Update the currently selected appointment's reservee information
	// if it is complete (name and phone number are filled out).
	handleUpdateAppointmentReservee(reservee) {
		if (reservee.name.length && reservee.phone.length) {
			this.appointments[this.selectedAppt.id].reservee = reservee;
			this.appointments[this.selectedAppt.id].reserved = true;
		}		
	}

	// Update the value of the currently selected appointment.
	// This can either be one of the mock appointments listed above or null
	// to represent a state where no appointment is currently selected by the user.
	handleUpdateSelectedAppointment(appt) {
		this.selectedAppt = appt;
	}
}

module.exports = alt.createStore(AppointmentStore, 'AppointmentStore');