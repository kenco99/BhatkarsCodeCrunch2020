const express = require('express')
const { covidByCountry, covidByCountryCode } = require('../apis/covid19')

const router = new express.Router()

router.get('/covid/country/name/:country_name', async (req, res) => {
    try {
        const country = req.params.country_name.toLowerCase()

        covidByCountry(country, (error, data, status) => {
            if (error) {
                return res.status(status).send(error)
            }
            res.status(status).send(data)
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/covid/country/code/:country_code', async (req, res) => {
    try {
        const code = req.params.country_code.toUpperCase()

        covidByCountryCode(code, (error, data, status) => {
            if (error) {
                return res.status(status).send(error)
            }
            res.status(status).send(data)
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/covid/country/search', async (req, res) => {
    try {
        var searchText = req.query.searchText.toUpperCase()

        if (searchText.length === 2 || searchText.length === 3) {
            covidByCountryCode(searchText, (error, data, status) => {
                if (error) {
                    return res.status(status).send(error)
                }
                res.status(status).send(data)
            })
        } else {
            searchText = req.query.searchText.toLowerCase()
            covidByCountry(searchText, (error, data, status) => {
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