const express = require('express')
const { tweetsByUser, tweetsByHashtag, tweetsByLocation} = require('../apis/twitter')

const router = new express.Router()

router.get('/twitter/user/:user_name', async (req, res) => {
    try {
        const userName = req.params.user_name.toLowerCase()
        tweetsByUser(userName, (error, data, status) => {
            if (error) {
                return res.status(status).send(error)
            }
            res.status(status).send(data)
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/twitter/hashtag/:hashtag', async (req, res) => {
    try {
        const hashtag = req.params.hashtag.toLowerCase()
        tweetsByHashtag(hashtag, (error, data, status) => {
            if (error) {
                return res.status(status).send(error)
            }
            res.status(status).send(data)
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/twitter/location', async (req, res) => {
    try {
        var lat = req.query.latitude
        var lng = req.query.longitude
        var radius = req.query.radius


        tweetsByLocation(lat, lng, radius, (error, data, status) => {
            if (error) {
                return res.status(status).send(error)
            }
            res.status(status).send(data)
        })


    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router