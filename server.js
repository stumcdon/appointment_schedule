var express = require('express');
var app = express();

// Set static file serving directories
app.use(express.static('public'));
app.use(express.static('build'));
app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));
app.use('/js', express.static('node_modules/jquery/dist'));

// Spin up an express http server on port 3000 to serve our web app
app.listen(3000, function () {
	console.log("Listening on port 3000...");
});

module.exports = app;