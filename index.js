// import the express module and create an application
const express = require('express'); 
const app = express();

// use the express Router object
let router = express.Router();

const port = 3000;

// create server to listen on port
app.listen(port, () => { 
    console.log(`listening at http://localhost:${port}`)
});

app.use(express.urlencoded({
    extended: true
}));

let tweets = [
    {"id": 1, "content": "tweet1", "username": "Avi", "timestamp": "", "likes_count": 233, "retweets_count": 8},
    {"id": 2, "content": "tweet2", "username": "Dan", "timestamp": "", "likes_count": 8, "retweets_count": 5},
    {"id": 3, "content": "tweet3", "username": "Shay", "timestamp": "", "likes_count": 456, "retweets_count": 90},
    {"id": 4, "content": "tweet4", "username": "Gal", "timestamp": "", "likes_count": 764, "retweets_count": 78},
    {"id": 5, "content": "tweet5", "username": "Dana", "timestamp": "", "likes_count": 67, "retweets_count": 34},
    {"id": 6, "content": "tweet6", "username": "Bar2", "timestamp": "", "likes_count": 234, "retweets_count": 56}
];
app.get('/tweets', function (req, res){ 
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "data": tweets
    });
});



app.post('/tweets', function(req, res){
    var body = req.body;
    console.log(req.body.content);
    res.send(req.body.content);
});