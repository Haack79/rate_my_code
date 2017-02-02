var mongoose = require('mongoose');
var Code = mongoose.model('Code');
module.exports = (function(){
  return {
    addCode: function(req, res){
      console.log("=========".yellow);
      console.log(req.body);
      console.log("=========".yellow);
      if(req.body.code.length <5){
        console.log("length is not 5 or longer");
        res.json({error: "code must be atleast 5 in length"});
      }
        var code = new Code({code: req.body.code, _user: req.body._user });
        m.save(function(error){
          if(err){
            console.log("error when saving".red);
          }else {
            console.log(code);
            console.log("code saved!".green);
            res.redirect('/codes/all');
          }
        })

    }











  }
})();
