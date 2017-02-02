
// Require Mongoose
var mongoose = require('mongoose');

// Create the user schema
var MessageSchema = new mongoose.Schema({
    content: {type: String, required: true, minlength: 3},
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    _comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

mongoose.model('Message', MessageSchema); // We are setting this Schema in our Models as 'Message'
