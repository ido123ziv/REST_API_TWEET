CREATE TABLE tweet (
        id INT NOT NULL,
        text_content TEXT NOT NULL,
        username TEXT NOT NULL,
        timestamp DATE NOT NULL,
        likes_count INT NOT NULL,
        retweets_count INT NOT NULL,
        PRIMARY KEY(id) 
    );

    CREATE TABLE likes (
        post_id INT NOT NULL,
        username TEXT NOT NULL,
        timestamp DATE NOT NULL, 
        FOREIGN KEY(post_id) REFERENCES tweet(id) 
    );

    CREATE TABLE ReTweet (
        post_id INT NOT NULL, 
        username TEXT NOT NULL, 
        timestamp DATE NOT NULL, 
        FOREIGN KEY(post_id) REFERENCES tweet(id) 
    );