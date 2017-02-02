var mongoose = require('mongoose');

var CodeSchema = new mongoose.Schema({
  code: {type: String, required: true, minlength: 5},
  rating:{type:Number, required: false},
  _user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
}, {timestamps: true});

mongoose.model('Code', CodeSchema);
