
app.controller('loginController', function($scope, $cookies, loginFactory, $location, $cookies){ //need to inject factory to call methods on it.
  $scope.test = "hello";

  // check for existing cookie and will do stuff depending on if the cookie exists.
  function checkCookie(){

    var cookie = $cookies.get('cookie');
    if(!cookie){
      // cookie is undefined
      console.log("No cookie for you!!");
    } else { //there is a cookie.
      console.log("Cookie found -----> " + cookie );
      console.log(cookie); //send to factory to get it.


      // Set user data in the factory and then redirect.
      loginFactory.setUser(JSON.parse(cookie), function(){
        $location.url('/wall');
      });

    }

  };
  checkCookie();

  //logout user
  $scope.clearCookie = function(){
    $cookies.remove('cookie');
    checkCookie();
  };
  //end user logout




  $scope.regUser = function(){
    console.log($scope.reg); //this will log info user puts in.
    $scope.error = "";
    $scope.user = {};

    if($scope.reg.password && $scope.reg.password == $scope.reg.passconf && $scope.reg.name && $scope.reg.email){
      //call factory method to register user.
      loginFactory.register($scope.reg, function(info_from_db){
        console.log(info_from_db);//logs info from db.
        console.log("back from the database/ n factory -register done");
        $scope.user = info_from_db.data;

        if(info_from_db.data.error){
          $scope.error = info_from_db.data.error;
        }else {
          loginFactory.setUser(info_from_db.data, function(){ //this is a callback to set user into db.

            $cookies.put('cookie', JSON.stringify(info_from_db.data));

            $location.url('/wall'); //this reroutes us to wall controller, after callback runs and sets user to wall.
          });
        }

      });
    } else {
      $scope.error = "passwords do not match";
    }

    //then clear input.  ==========
    $scope.reg =  {};
  }

  $scope.loginUser = function(){
    console.log($scope.login); //this will log info user puts in.

    //call factory method to login user.
    loginFactory.login($scope.login, function(info_from_db){
      console.log(info_from_db);
      console.log("back from the database -login finished");

      if(info_from_db.data.error){
        $scope.error = info_from_db.data.error;
      }else {
        loginFactory.setUser(info_from_db.data, function(){ //this is a callback to set user into db.
          $cookies.put('cookie', JSON.stringify(info_from_db.data));
          $location.url('/wall'); //this reroutes us to wall controller, after callback runs and sets user to wall.
        });
      }

    });

    //then clear input.  ==========
    $scope.login =  {};
  }

});

//  wall controller =================================
app.controller('wallController', function($scope, loginFactory, wallFactory, $cookies, $location){
  console.log("in the wall controller");
  //this triggers the connection in our server.
  var socket = io.connect();
  socket.on('getAllMessages', function (data){
    $scope.messages = [];
    getM();
  });
  //=====================
  $scope.user = {};

  $scope.messages = [];
  loginFactory.getUser(function(data){ //this data is coming from factory.
    $scope.user = data; //this data from the factory.
    console.log($scope.user);
    if(!$scope.user._id){
      console.log("kicking you out!");
      $location.url('/');//this sends back to login page.
    }

  });
  function getM(){
    wallFactory.getAllMessages(function(info_from_db){
      $scope.messages = info_from_db;
      console.log(info_from_db);
    })
  }
  getM();

  wallFactory.getAllMessages(function(info_from_db){
    $scope.messages = info_from_db;
    console.log(info_from_db);
  })

  $scope.submitNewMessage = function(){
    $scope.newMessage._user = $scope.user._id;
    console.log($scope.submitNewMessage);

    //run the factory method to save new message
    wallFactory.submitNewMessage($scope.newMessage, function(info_from_db){
      console.log(info_from_db);
      $scope.messages = info_from_db;
      //comment was saved at this point
      socket.emit("updateInfo", {});
    })

  }
    $scope.newMessage = {};


    $scope.submitNewComment = function(id, content){

    var newComment = {};
    newComment._user = $scope.user._id;
    newComment.content = content;
    newComment._message = id;
    console.log(newComment);

    //run the factory method to save the comment.
    wallFactory.submitNewComment(newComment, function(info_from_db) {
      console.log(info_from_db);
      $scope.messages = info_from_db;

      //we know comment saved on this users wall.
      socket.emit("updateInfo", {});
    })
  }
  //logout user
  $scope.clearCookie = function(){
    $cookies.remove('cookie');
    $location.url('/');
  }
});
// =============codeController ==============================
app.controller('codeController', function($scope, codeFactory, loginFactory, wallFactory, $cookies, $location){
  $scope.user = {};
  $scope.codes = [];

  codeFactory.getUser(function(data){ //this data is coming from factory.
    $scope.user = data; //this data from the factory.
    console.log($scope.user);
    if(!$scope.user._id){
      console.log("kicking you out!");
      $location.url('/');//this sends back to login page.
    }
  });
  codeFactory.getAllCodes(function(info_from_db){
    $scope.messages = info_from_db;
    console.log(info_from_db);
  })
  
  $scope.submitNewCode = function(){
    $scope.newCode._user = $scope.user._id;
    console.log($scope.newCode);

    codeFactory.addCode(newCode, function(info_from_db){
      console.log(info_from_db);
      $scope.codes = info_from_db;
    })
  }



});
