//haackattack

// Require the controllers
var users = require('./../controllers/users.js');
var messages = require('./../controllers/messages.js');
var comments = require('./../controllers/comments.js');
var codes = require('./../controllers/codes.js');




// Define the routes
module.exports = function(app, io) {

    io.sockets.on('connection', function(socket){
      //run as soon as socket is connected ----
      console.log("we are using sockets my friend");
      console.log(socket.id);

      socket.on("updateInfo", function(data){
        //tell all clients to update info except one sending it.
        socket.broadcast.emit("getAllMessages");
      });
    });
    // User routes ===================================================
    app.post('/reg', function(req, res) {
        users.reg(req, res);
    });
    // login routes
    app.post('/login', function(req, res) {
        users.login(req, res);
    });
    //message routes =========================
    app.get('/messages/all', function(req, res) {
        messages.getAllMessages(req, res);
    });
    app.post('/messages/new', function(req, res) {
        messages.addMessage(req, res);
    });
    //Comment Routes ======================
    app.post('/comments/new', function(req, res) {
        comments.addComment(req, res); //go to comments.js
    });
    // add routes for code =========================
    app.post('/addCode', function(req, res) {
        comments.addCode(req, res); //go to comments.js
    });
    app.get('/codes/all', function(req, res) {
        messages.getAllCodes(req, res);
    });
};
