#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "POSTGRES" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE docker;

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

    INSERT INTO tweet (id, text_content, username, timestamp, likes_count, retweets_count) VALUES (1, 'tweet1', 'Avi', '11.NOV.2011', 2, 3);
    INSERT INTO tweet (id, text_content, username, timestamp, likes_count, retweets_count) VALUES (2, 'tweet2', 'Dan', '12.NOV.2021', 2, 2);
    INSERT INTO tweet (id, text_content, username, timestamp, likes_count, retweets_count) VALUES (3, 'tweet3', 'Eran', '11.NOV.2021', 2, 3);
    INSERT INTO tweet (id, text_content, username, timestamp, likes_count, retweets_count) VALUES (4, 'tweet4', 'Dana', '11.NOV.2021', 2, 2);
    INSERT INTO tweet (id, text_content, username, timestamp, likes_count, retweets_count) VALUES (5, 'tweet5', 'Chen', '15.NOV.2021', 2, 2);
    INSERT INTO tweet (id, text_content, username, timestamp, likes_count, retweets_count) VALUES (6, 'tweet6', 'Aviv', '11.NOV.2021', 2, 2);
    INSERT INTO tweet (id, text_content, username, timestamp, likes_count, retweets_count) VALUES (7, 'tweet7', 'Gal', '20.NOV.2021', 1, 1);

    INSERT INTO likes (post_id, username, timestamp) VALUES (1, 'Avi', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (2, 'Avi', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (3, 'Avi', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (4, 'Avi', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (5, 'Avi', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (6, 'Avi', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (1, 'Gal', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (2, 'Gal', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (3, 'Gal', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (6, 'Aviv', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (7, 'Gal', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (4, 'Gal', '20.NOV.2021');
    INSERT INTO likes (post_id, username, timestamp) VALUES (5, 'Gal', '20.NOV.2021');

    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (1, 'Avi', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (2, 'Avi', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (3, 'Avi', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (4, 'Avi', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (5, 'Avi', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (6, 'Avi', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (1, 'Gal', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (2, 'Gal', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (3, 'Gal', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (6, 'Aviv', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (7, 'Gal', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (4, 'Gal', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (5, 'Gal', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (1, 'Shir', '20.NOV.2021');
    INSERT INTO ReTweet (post_id, username, timestamp) VALUES (3, 'Shir', '20.NOV.2021');
 
    GRANT ALL PRIVILEGES ON DATABASE docker TO docker;

EOSQL
