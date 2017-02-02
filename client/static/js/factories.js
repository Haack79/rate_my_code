

app.factory('loginFactory', function ($http) {
    var factory = {};
    var user = {};
    //register method
    factory.register = function(data_from_user, callback){
      $http.post('/reg', data_from_user).then(function(info_from_db){
        console.log("we made it back "); //.then only runs after db comes back from db.
        callback(info_from_db);
      }); //this http request will have call back to run in this callback.  yo dawg u like callbacks, so callback in callback
    }
// login method ==
    factory.login = function(data_from_user, callback){
      $http.post('/login', data_from_user).then(function(info_from_db){ //info from db goes to controller.
        console.log("we made it back "); //.then only runs after db comes back from db.
        callback(info_from_db);
      }); //this http request will have call back to run in this callback.  yo dawg u like callbacks, so callback in callback
    }

    //setter for user object.
    factory.setUser = function(data, callback){
      user = data;
      callback();
    }
    //getter for user object.
    factory.getUser = function(callback){
      callback(user);
    }


    return factory;
});
//=========wallFactory ===============================================
app.factory('wallFactory', function ($http) {
    var factory = {};

    factory.submitNewMessage = function(data_from_user, callback){
      $http.post('/messages/new', data_from_user).then(function(info_from_db){ //info from db goes to controller.
        console.log("we just added a message! "); //.then only runs after db comes back from db.
        callback(info_from_db.data);
      });
    }
    factory.submitNewComment = function(data_from_user, callback){
      $http.post('/comments/new', data_from_user).then(function(info_from_db){
        console.log("we just added a new comment");
        callback(info_from_db.data);
      });
    }
    factory.getAllMessages = function(callback){
      $http.get('/messages/all').then(function(info_from_db){
        console.log("we just got all messages");
        callback(info_from_db.data);
      });
    }

    return factory;
});
//==============codeFactory ========================================
app.factory('codeFactory', function ($http) {
    var factory = {};
    var user = {};
    factory.submitNewCode = function(data_from_user, callback){
      $http.post('/addCode', data_from_user).then(function(info_from_db){
        console.log("we made it back "); //.then only runs after db comes back from db.
        callback(info_from_db);
      }); //this http request will have call back to run in this callback.  yo dawg u like callbacks, so callback in callback
    }
    factory.getAllCodes = function(callback){
      $http.get('/codes/all').then(function(info_from_db){
        console.log("we just got all messages");
        callback(info_from_db.data);
      });
    }

    // factory.getUser = function(callback){
    //   callback(user);
    // }
});
