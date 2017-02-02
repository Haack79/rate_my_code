

// Require Mongoose
var mongoose = require('mongoose');

//get bcrypt
var bcrypt = require('bcrypt');

// Require the model and save it in a variable
var User = mongoose.model('User');



module.exports = (function() {
    return {
        reg: function(req, res) {
          console.log("were at reg method server--users controller".blue);
          console.log(req.body);
          if(req.body.name.length < 3){
              console.log("name length must be more than 3");
              res.json({error: "name must be 3 or longer in length"});
          }
// check if already have a user with this email
            User.findOne({email: req.body.email}, function(err, oneUser){
              if(err){
                console.log("errorrrrrrrrrrrr=====".red);
              } else {
                //1. user found
                if(oneUser){
                  console.log("erorrr======== user found".yellow);
                  res.json({error: "email is already registered. Login instead"});
                } else {
                  //user was not found
                  console.log("user is good to register".green);

                  var pw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));

                    //create the user object and save to the db.
                  var user = new User({name: req.body.name, email: req.body.email, password: pw});
                  user.save(function(err){
                    if(err){
                      console.log("error when registering======".red);
                    } else {
                      console.log("registration success !! ".blue);
                      res.json(user);
                    }
                  });
                }
              }
            });
        },

        login: function(req, res){
          console.log("in login method --users controller".blue);
          console.log(req.body);
          // find user with the email.
          User.findOne({email: req.body.email}, function(err, oneUser){
            if(err){
              console.log("=====error=====".red);
            } else {
              //1. user not found
              if(!oneUser){
                console.log("erorrr======== user not found".yellow);
                res.json({error: "email not registered. please register."});//look for this error and use it in controllers
              } else {
                //user was found
                console.log("checking password".green);
                //authenticate password.

                if(bcrypt.compareSync(req.body.password, oneUser.password)){
                  console.log("successfully logged in!".green);
                  res.json(oneUser); //this goes back to factory to login function
                } else {
                  res.json({error: "password is incorrect"});
                }
              }
            }
          });

        }

    }
})();
