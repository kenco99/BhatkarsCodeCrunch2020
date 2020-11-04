const express = require('express')
const { weatherByCity, weatherByCords, weatherByPincode } = require('../apis/weather')

const router = new express.Router()

router.get('/weather/city/:city_name', async (req, res) => {
    try {
        const city = req.params.city_name.toLowerCase()
        weatherByCity(city, (error, data, status) => {
            if (error) {
                return res.status(status).send(error)
            }
            res.status(status).send(data)
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/weather/search', async (req, res) => {
    try {
        var lat = req.query.latitude
        var lng = req.query.longitude
        var pincode = req.query.pin_code

        if (!!pincode) {
            weatherByPincode(pincode, (error, data, status) => {
                if (error) {
                    return res.status(status).send(error)
                }
                res.status(status).send(data)
            })
        } else {
            weatherByCords(lat, lng, (error, data, status) => {
                if (error) {
                    return res.status(status).send(error)
                }
                res.status(status).send(data)
            })
        }

    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router