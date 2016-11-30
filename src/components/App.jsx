var React = require('react');
var AltContainer = require('alt-container');

var AppointmentList = require('./AppointmentList.jsx');
var AppointmentStore = require('../stores/AppointmentStore.jsx');
var Modal = require('./Modal.jsx');

// The main "Application" container. Its state is kept in a single store, AppointmentStore
// for simplicity. Any actions performed on that store trigger a change in state and a rerender
// of this component. The appointment data is passed to the appointment list components as props.
// The values of the modal's textboxes are passed to the modal through a prop to prepopulate the fields.
var App = React.createClass({

	// Get initial state from the store
	getInitialState() {
		return AppointmentStore.getState();
	},

	// When this component is added to the DOM, start listening for changes to the store
	// so we can update/rerender our view components.
	componentDidMount() {
		AppointmentStore.listen(this.onChange);
	},

	// When this component is removed from the DOM, stop listening for store changes so we
	// don't leak memory.
	componentWillUnmount() {
		AppointmentStore.unlisten(this.onChange);
	},

	// Handle the store change event by simply setting this components state equal to the
	// values held in the store.
	onChange(state) {
		this.setState(state);
	},

	// Produce the DOM elements we want to show on the screen. This happens everytime
	// setState() is called. In this component's case, display the main containers
	// of the application as well as a title and instructions.
	render () {
		return (
			<div className="container">
				<div className="jumbotron">
					<h1>All Appointments</h1>
					<p>Select a time slot to schedule an appointment!</p>
				</div>
				<AltContainer store={AppointmentStore}>
					<AppointmentList />
				</AltContainer>
				<Modal selectedAppt={this.state.selectedAppt} />	
			</div>
		);
	}
});

module.exports = App;