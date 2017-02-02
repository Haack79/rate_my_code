var mongoose = require('mongoose');//get mongoose to deal with it.
var Comment = mongoose.model('Comment');//get the model
var Message = mongoose.model('Message');
module.exports = (function(){
  return  {
    addComment: function(req, res) {
      console.log("==========".yellow);
      console.log(req.body);
      console.log("============".yellow);
        //cause message holds array of comments.
      var c = new Comment({content: req.body.content, _user: req.body._user, _message: req.body._message});
      c.save(function(err){
        if(err){
          console.log("error");
        } else {
          //we know comments is already saved.
          Message.findOne({_id: req.body._message}, function(err, oneMessage){
            if(err){
              console.log("error ");
            } else {
              oneMessage._comments.push(c._id);
              //save the changes.
              oneMessage.save(function(err){
                if(err){
                  console.log("error".red);
                } else {
                  console.log(c);
                  console.log("saved the above comment".green);
                  res.redirect('/messages/all'); //get all messages and send back as json.
                }
              })
            }
          });
        }
      })
    }
  }
})();
