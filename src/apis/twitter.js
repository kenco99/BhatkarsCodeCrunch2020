var Twit = require('twit');


const tweetsByUser = async (screen_name, callback) => {
    var T = new Twit({
        consumer_key: `${process.env.TWITTER_CONSUMER_KEY}`,
        consumer_secret: `${process.env.TWITTER_CONSUMER_SECRET}`,
        access_token: `${process.env.TWITTER_ACCESS_TOKEN_KEY}`,
        access_token_secret: `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`
    })

    var options = {
        screen_name,
        count: 10
    };

    T.get('statuses/user_timeline', options, function (err, data) {
        if (err) {
            return callback({
                "status": 404,
                "message": "tweets not found"
            }, undefined, 404)

        } else if (data.length === 0) {
            return callback({
                "status": 404,
                "message": "tweets not found"
            }, undefined, 404)
        }
        var tweets = {
            user_name: data[0].user.name,
            user_screen_name: data[0].user.screen_name,
            followers_count: data[0].user.followers_count,
            friends_count: data[0].user.friends_count,
            tweets: []
        }

        for (var i = 0; i < data.length; i++) {
            if (tweets.user_screen_name.toLowerCase() === screen_name.toLowerCase()) {
                tweets.tweets.push({
                    created_at: data[i].created_at,
                    text: data[i].text
                })
            }

        }
        callback(undefined, tweets, 200)
    })
}

const tweetsByHashtag = async (hashtag, callback) => {
    var T = new Twit({
        consumer_key: `${process.env.TWITTER_CONSUMER_KEY}`,
        consumer_secret: `${process.env.TWITTER_CONSUMER_SECRET}`,
        access_token: `${process.env.TWITTER_ACCESS_TOKEN_KEY}`,
        access_token_secret: `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`
    })

    var options = {
        q: hashtag,
        count: 10
    };

    T.get('search/tweets', options, function (err, data) {
        if (err) {
            return callback({
                "status": 404,
                "message": "tweets not found"
            }, undefined, 404)

        } else if (data.statuses.length === 0) {
            return callback({
                "status": 404,
                "message": "tweets not found"
            }, undefined, 404)
        }

        var tweets = []
        for (var i = 0; i < data.statuses.length; i++) {
            tweets.push({
                text: data.statuses[i].text,
                user_screen_name: data.statuses[i].user.screen_name,
                retweet_count: data.statuses[i].retweet_count
            })
        }

        callback(undefined, tweets, 200)

    })
}

const tweetsByLocation = async (lat, lng, radius, callback) => {
    var T = new Twit({
        consumer_key: `${process.env.TWITTER_CONSUMER_KEY}`,
        consumer_secret: `${process.env.TWITTER_CONSUMER_SECRET}`,
        access_token: `${process.env.TWITTER_ACCESS_TOKEN_KEY}`,
        access_token_secret: `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`
    })

    var loc = `${lat},${lng},${radius}`
    var options = {
        geocode: loc,
        count: 10
    };

    T.get('search/tweets', options, function (err, data) {
        if (err) {
            return callback({
                "status": 404,
                "message": "tweets not found"
            }, undefined, 404)

        } else if (data.statuses.length === 0) {
            return callback({
                "status": 404,
                "message": "tweets not found"
            }, undefined, 404)
        }
        
        var tweets = []
        for (var i = 0; i < data.statuses.length; i++) {
            tweets.push({
                text: data.statuses[i].text,
                user_screen_name: data.statuses[i].user.screen_name
            })
        }
        
        callback(undefined, tweets, 200)

    })
}


//tweetsByUser('ergergeu')

module.exports = { tweetsByUser, tweetsByHashtag, tweetsByLocation }

