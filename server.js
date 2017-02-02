
// =========================================================================
// ============================== Require ==================================
// =========================================================================
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = 9000;
require('colors');


// =========================================================================
// =============================== Setup ===================================
// =========================================================================
var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client'))); //gets to static files.
app.use(express.static("./bower_components")); //can get it and require bower

// =========================================================================
// ============================= Database ==================================
// =========================================================================
require('./server/config/mongoose.js');


// =========================================================================
// =============================== Routes ==================================
// =========================================================================


// =========================================================================
// =============================== Listen ==================================
// =========================================================================
 var server = app.listen(port, function() {
    console.log("It's over",port,"!!!".blue);
});
//make io to use for connection -============----
var io = require('socket.io').listen(server);
require('./server/config/routes.js')(app, io);
//end =========
