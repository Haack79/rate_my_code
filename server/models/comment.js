
// Require Mongoose
var mongoose = require('mongoose');

// Create the user schema
var CommentSchema = new mongoose.Schema({
    content: {type: String, required: true, minlength: 3},
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    _message: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
}, {timestamps: true});

mongoose.model('Comment', CommentSchema); // We are setting this Schema in our Models as 'Comment'
