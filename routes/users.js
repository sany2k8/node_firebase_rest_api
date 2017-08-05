// import modules
var express = require('express');
var router = express.Router();
var http = require('https');

//firebase variables
var firebase_data_url = 'https://sany-node.firebaseio.com/';
var firebase_data_format = ".json";

//Node REST client
var Client = require('node-rest-client').Client;
var client = new Client();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a users resource');
});

//get all users
router.get('/get-users',function (req,res,next) {
    var root_node = 'users';
    var childPath = firebase_data_url + 'users' + firebase_data_format;
    client.get(childPath,function (data,response) {
        if(response.statusCode === 200){
            res.status(200).send(data);
        }else{
            res.send('Firebase connection error');
        }
    });
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

//get all property from Firebase Database by their name
router.get('/get-data-by-key/:property',function (req,res,next) {

    var validProperty = ['users','messages'];
    var result =[];
    var element ={};
    var firebase_prop = req.params.property;
    var childPath = firebase_prop + firebase_data_format;

    if(validProperty.indexOf(firebase_prop) > -1){

        client.get(firebase_data_url + childPath , function (data, response) {

            element.status = 'Success';
            element.data = data;
            result.push(element);
            res.status(200).send(result);
        });

    }else{
            element.status = 'Failure';
            element.message = 'Only supports these parameters ['+ (validProperty)+']';
            result.push(element);
            res.status(400).send(result);
    }
});

module.exports = router;
