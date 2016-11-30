var React = require('react');
var ReactDOM = require('react-dom');

var AppointmentActions = require('../actions/AppointmentActions.jsx');

// This component is used to construct a modal for the user to input
// a name and phone number in order to schedule or update an appointment.
var Modal = React.createClass({

	// Set the initial state of this component to be blank text for
	// its text fields and for the text fields to not be considered
	// prepopulated from data from the store.
	getInitialState () {
		return {
			reserveeText: {
				name: "",
				phone: ""
			},
			prepopulated: false
		};
	},

	// Listen for the modal being closed
	componentDidMount () {
		$(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.handleClose);
	},

	render () {
		// If a non-null appointment comes in and the fields haven't been prepopulated yet
		// for this appointment selection...
		if (this.props.selectedAppt && !this.state.prepopulated) {
			// Set the text fields' state to be equal to the appointment's reservee data
			this.state.reserveeText = this.props.selectedAppt.reservee;
			// Set the state to an already prepopulated condition so we don't keep prepopulating
			// over top of any changes the user makes to the name/phone number.
			this.state.prepopulated = true;
		}
		// Disable the submit button if both fields have not been filled in
		var submitEnabled = this.bothFieldsFilled() ? 'active' : 'disabled';
		var modalDismissProperty = this.bothFieldsFilled() ? "modal" : "";
		return (
			<div id="update-modal" className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
							<h4 className="modal-title">Schedule Your Appointment</h4>
						</div>
						<div className="modal-body">
							<div className="input-group">
								<label htmlFor="name-input">Name</label>
								<input type="text" className="form-control" id="name-input" onChange={this.handleNameTextChange} value={this.state.reserveeText.name} />
							</div>
							<div className="input-group">
								<label htmlFor="phone-input">Phone Number</label>
								<input type="text" className="form-control" id="phone-input" onChange={this.handlePhoneTextChange} value={this.state.reserveeText.phone} />
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className={"btn btn-primary " + submitEnabled} data-dismiss={modalDismissProperty} onClick={this.handleScheduleApt}>Schedule Appointment</button>
						</div>
					</div>
				</div>
			</div>
		);
	},

	// Update the name text field state when the user types into the name textbox.
	handleNameTextChange (e) {
		this.setState({reserveeText: {name: e.target.value, phone: this.state.reserveeText.phone}});	
	},

	// Update the phone text field state when the user types into the phone textbox.
	handlePhoneTextChange (e) {
		this.setState({reserveeText: {name: this.state.reserveeText.name, phone: e.target.value}});	
	},

	// Inform the store that the reservee information for the currently selected appointment
	// needs to be updated with the values that are now in the name/phone textboxes.
	handleScheduleApt () {
		if (this.bothFieldsFilled()) {
			AppointmentActions.updateAppointmentReservee(this.state.reserveeText);
		}
	},

	// Inform the store that no appointment is currently selected when the modal is closed.
	// Also, reset the state of the modal so the textboxes are empty and not considered prepopulated.
	handleClose () {
		AppointmentActions.updateSelectedAppointment(null);
		this.setState(this.getInitialState());
	},

	// Returns true if both the name and phone textboxes have been filled in.
	bothFieldsFilled () {
		return this.state.reserveeText.name.length && this.state.reserveeText.phone.length;
	}
});

module.exports = Modal;