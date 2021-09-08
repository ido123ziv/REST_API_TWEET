// import the express module and create an application
const express = require('express'); 
const app = express();
const db = require('./queries')
const port = 2000;

// create server to listen on port
var server = app.listen(port, () => { 
    console.log(`listening at http://localhost:${port}`)
});

app.use(express.urlencoded({
    extended: true
}));


app.get('/tweets', db.getTweets); // Create Get to return all tweets
app.get('/tweets/:id', db.getTweetById); // Create Get/id to return a single tweet
app.get('/retweets', db.getReTweets); // Create Get to return all retweets
app.get('/retweets/:id', db.getReTweetById); // Create Get/id to return a single retweets
app.get('/likes', db.getLikes); // Create Get to return all likes
app.get('/retweets/:id', db.getLikesById); // Create Get/id to return a single like
app.post('/tweets', db.createTweet) // Create POST to create a new tweet
app.post('/tweets/:id/retweet', db.createReTweet) // Create POST to create a new retweet
app.post('/tweets/:id/likes', db.createLike) // Create POST to create a new like