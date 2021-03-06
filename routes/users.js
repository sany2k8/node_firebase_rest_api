// import modules
var express = require('express');
var router = express.Router();
var http = require('https');

//firebase variables
var firebase_data_url = 'https://sany-node.firebaseio.com/';
var firebase_data_format = ".json";
var nodes = {'usr':'users','msg':'messages'};
//Node REST client
var Client = require('node-rest-client').Client;
var client = new Client();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(
        JSON.stringify({ 'Supported endpoints': {
        '/get-users':'Get all users list',
        '/add-user':'Add new user, send raw json on post body ',
        '/get-user/:id':'Get single user by :id',
        '/delete-user/:id':'Delete a user by :id',
        '/update-user/:id':'Update a user by :id',
        '/get-data-by-key/:property':'Get all database table from Firebase by :property'
    } }));
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

//add user
router.post('/add-user',function (req,res,next) {
    if(req.body.constructor === Object && Object.keys(req.body).length !==0){
        var args = {
            data : req.body,
            headers:{'Content-Type':'application/json'}
        };

        var clientPath = firebase_data_url + nodes.usr + firebase_data_format;
        client.post(clientPath,args, function (data,response) {
           if(response.statusCode === 200){
               res.send(data);
           }
        });
    }
});

//get user by id
router.get('/get-user/:id',function (req,res,next) {

    var userId = req.params.id;

    if(userId){
        var clientPath = firebase_data_url + nodes.usr + '/' + userId + firebase_data_format;
        client.get(clientPath,function (data,resposne) {
            res.status(200).send(data);
        });
    }else{
        res.json({'status':'failure','message':'param id missing'});
    }
});

//delete user by id
router.delete('/delete-user/:id',function (req,res,next) {
    var userId = req.params.id;
    if(userId){
        var clientPath = firebase_data_url + nodes.usr + '/' + userId + firebase_data_format;
        client.delete(clientPath,function (data,resposne) {
            res.status(200).send(data);
        });
    }else{
        res.json({'status':'failure','message':'param id missing'});
    }
});

//update data user by id
router.patch('/update-user/:id',function (req,res,next) {
    var userId = req.params.id;
    var req_body = req.body;

    if(userId){
        if(req_body.constructor === Object && Object.keys(req_body).length !==0){
            var args = {
                data : req.body,
                headers:{'Content-Type':'application/json'}
            };

            var clientPath = firebase_data_url + nodes.usr + '/' + userId + firebase_data_format;
            client.patch(clientPath,args, function (data,response) {
                if(response.statusCode === 200){
                    res.send(data);
                }
            });
        }
    }else{
        res.json({'status':'failure','message':'param id missing'});
    }
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

