var express = require('express');
var router = express.Router();
var http = require('https');

//Node REST client
var Client = require('node-rest-client').Client;

var client = new Client();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a users resource');
});


//get all users
router.get('/get-users',function (req,res,next) {
    res.send('respond with a get-users');
});

//get user by id
router.get('/add-user',function (req,res,next) {
    res.send('respond with a add-user');
});


//get user by id
router.get('/get-user',function (req,res,next) {
    res.send('respond with a get-user');
});


//delete user by id
router.get('/delete-user',function (req,res,next) {
    res.send('respond with a delete-user');
});


//update user by id
router.get('/update-user',function (req,res,next) {
    res.send('respond with a update-user');
});


router.get('/get-name/:property',function (req,res,next) {

    console.log(req.params.property);
    var firebase_prop = req.params.property;
    // direct way
    if(firebase_prop){
       client.get("https://sany-node.firebaseio.com/" + firebase_prop + ".json", function (data, response) {
         console.log(data);
         //res.send(data.toString());
         console.log(typeof data);
         res.status(200).send(data.toString());
       });
    }else{
        res.send('wrong property name'+req.params.property);
    }
   

});

module.exports = router;
