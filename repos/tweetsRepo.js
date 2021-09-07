let fs = require('fs'); // a module which know to handle with reading and writing files

const FILE_NAME = './assets/tweets.json';

let tweetsRepo = {
    get: function(resolve, reject) { // get all the tweets
        fs.readFile(FILE_NAME, function (err, data) {
            if(err){
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    },
    getById: function(id, resolve, reject) { // get tweet by its id
        fs.readFile(FILE_NAME, function (err, data) {
            if(err){
                reject(err);
            }
            else {
                let tweet = JSON.parse(data).find(v => v.id == id);
                resolve(tweet);
            }
        });
    }
   /*search: function (searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data){
            if(err){
                reject(err);
            }
            else {
                let tweets = JSON.parse(data); // perform search
                if(searchObject) {
                    // Example for search object => searchObject = { "id": 1, "username": 'username1' }
                    tweets = tweets.filter(
                        v => (searchObject.id ? v.id == searchObject.id : )
                    )
                }

        })
    } */
};

module.exports = tweetsRepo;
