# REST_API_TWEET
In this project @GilShmaya is the Backend Engineer and @ido123ziv is the DevOps Engineer.
We use a simple REST API to query our `node` server about latest tweets, Database is `Postgers`

## Prerequisites
* NodeJs
* Docker
* Have a db password as an Environmet Variable:
```bash
export DB_PASSWORD="YourSecretPassword"
```

## How to Run?
First, clone the Repo and than use the following:
```bash
docker-compose build
docker-compose up
```

And to query the server use:
```
curl -i http://localhost/getTweets
```