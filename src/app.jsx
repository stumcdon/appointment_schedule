var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App.jsx');

// Attach the main App component to the app_root <div> tag in index.html.
ReactDOM.render(
	<App />, document.getElementById('app_root')
);