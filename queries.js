const Pool = require('pg').Pool; // set up the configuration of your PostgreSQL connection.
const connectionString = 'postgres://docker:password@db:5432/docker'
// const pool = new Pool({
//   user: 'docker',
//   host: 'localhost',
//   database: 'docker',
//   password: 'password',
//   port: 5432,
// });

const pool = new Pool({
  connectionString,
});

let id;
pool.query('SELECT * FROM tweet', (error, results) => {
  if (error) {
    throw error;
  }
  id = parseInt(results.rowCount); // default id
});



// query -> get all the tweets
const getTweets = function(request, response) {
  pool.query('SELECT * FROM tweet ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

// query -> get tweet according its id
const getTweetById = (request, response) => {
  const postid = parseInt(request.params.id);

  pool.query('SELECT * FROM tweet WHERE id = $1', [postid], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// query -> get all the retweets
const getReTweets = (request, response) => {
  pool.query('SELECT * FROM retweet ORDER BY post_id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// query -> get retweet according its post_id
const getReTweetById = (request, response) => {
  const postid = parseInt(request.params.id);

  pool.query('SELECT * FROM retweet WHERE post_id = $1', [postid], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// query -> get all the likes
const getLikes = (request, response) => {
  pool.query('SELECT * FROM likes ORDER BY post_id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// query -> get likes according its post_id
const getLikesById = (request, response) => {
  const postid = parseInt(request.params.id);

  pool.query('SELECT * FROM likes WHERE post_id = $1', [postid], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// query -> post create new tweet
const createTweet = (request, response) => {
  const { content, username } = request.body;
  if (!content || !username)
    return res
      .status(400)
      .json({message: 'post_id and username must be provided'});

  pool.query('INSERT INTO tweet (id, text_content, username, timestamp, likes_count, retweets_count) VALUES ($1, $2, $3, $4, $5, $6)', [id, content, username, new Date().toISOString(), 0, 0], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Tweet added with ID: ${id}`);
    id += 1; // ready for next tweet
  });
};

// query -> post create new retweet
const createReTweet = (request, response) => {
  const post_id = parseInt(request.params.id);
  const { username } = request.body;
  if (!post_id || !username)
    return res
      .status(400)
      .json({message: 'post_id and username must be provided'});

  pool.query('INSERT INTO ReTweet (post_id, username, timestamp) VALUES ($1, $2, $3)', [post_id, username, new Date().toISOString()], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`ReTweet added of ID: ${post_id}`);
  });

  updateNumOfRetweetTweet(post_id); // update the amount of retweets of the post
};

// query -> post create new like
const createLike = (request, response) => {
  const post_id = parseInt(request.params.id)
  const { username } = request.body;
  if (!post_id || !username)
    return res
      .status(400)
      .json({message: 'post_id and username must be provided'});

  pool.query('INSERT INTO likes (post_id, username, timestamp) VALUES ($1, $2, $3)', [post_id, username, new Date().toISOString()], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Like added of ID: ${post_id}`);
  });

  updateNumOfLikesTweet(post_id); // update the amount of retweets of the post

};

// update -> increase the count_retweet by 1
const updateNumOfRetweetTweet = (id) => {
  let count_retweet;
  pool.query('SELECT * FROM ReTweet WHERE post_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    count_retweet = parseInt(results.rowCount);
    pool.query(
      'UPDATE tweet SET retweets_count = $1 WHERE id = $2', [count_retweet + 1, id], (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
  });
};

// update -> increase the likes_count by 1
const updateNumOfLikesTweet = (id) => {
  let likes_count;
  pool.query('SELECT * FROM likes WHERE post_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    likes_count = parseInt(results.rowCount);
    pool.query(
      'UPDATE tweet SET likes_count = $1 WHERE id = $2', [likes_count + 1, id], (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
  });
  
};

module.exports = {
  getTweets,
  getTweetById,
  getReTweets,
  getReTweetById,
  getLikes,
  getLikesById,
  createTweet,
  createReTweet,
  createLike,
}