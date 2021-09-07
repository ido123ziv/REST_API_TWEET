// import the express module and create an application
const express = require('express'); 
const db = require('postgres'); 

const app = express();
let tweetsRepo = require('./repos/tweetsRepo');

// use the express Router object
let router = express.Router();
const port = 2000;

// create server to listen on port
var server = app.listen(port, () => { 
    console.log(`listening at http://localhost:${port}`)
});

app.use(express.urlencoded({
    extended: true
}));

// Create Get to return all tweets
app.get('/tweets', function (req, res, next){ 
    tweetsRepo.get(function (data) {
        res.status(200).json({ // resolve
            "status": 200,
            "statusText": "OK",
            "data": data
        });
    }, function(err) { // reject
        next(err);
    });
});

// Create Get/id to return a single tweet
app.get('/tweets/:id', function(req, res, next) {
    tweetsRepo.getById(req.params.id, function (data) {
        if(data) {
            res.status(200).json({ // resolve
                "status": 200,
                "statusText": "OK",
                "data": data
            });
        }
        else{ 
            res.status(404).json({
                "status": 404,
                "statusText": "NOT FOUND",
                "error": {
                    "code": "NOT FOUND",
                    "message": "The tweet with id '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function(err) { // reject
        next(err);
    });
});




app.post('/tweets', function(req, res){
    var body = req.body;
    console.log(req.body.content);
    res.send(req.body.content);
});