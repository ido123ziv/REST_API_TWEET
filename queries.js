const Pool = require('pg').Pool; // set up the configuration of your PostgreSQL connection.
const pool = new Pool({
  user: 'POSTGRES',
  host: 'localhost',
  database: 'db',
  password: 'password',
  port: 5432,
});

// query -> get all the tweets
const getTweets = function(request, response) {
  pool.query('SELECT * FROM tweet ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
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
  const postid = parseInt(request.params.id)

  pool.query('SELECT * FROM likes WHERE post_id = $1', [postid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTweet = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}