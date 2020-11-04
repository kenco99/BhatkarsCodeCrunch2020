const express = require('express')
const { countryByName, countryByCode, countryByCallingCode, countryByCapital } = require('../apis/country-details')

const router = new express.Router()

router.get('/country/name/:country_name', async (req, res) => {
    try {
        const country = req.params.country_name.toLowerCase()

        countryByName(country, (error, data, status) => {
            if (error) {
                return res.status(status).send(error)
            }
            delete data.timezones;
            res.status(status).send(data)
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/country/code/:country_code', async (req, res) => {
    try {
        const code = req.params.country_code.toUpperCase()

        countryByCode(code, (error, data, status) => {
            if (error) {
                return res.status(status).send(error)
            }
            res.status(status).send(data)
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/country/search', async (req, res) => {
    try {
        var searchText = req.query.searchText.toUpperCase()

        if (!isNaN(searchText)) {
            details = await countryByCallingCode(searchText, (error, data, status) => {
                if (error) {
                    return res.status(status).send(error)
                }
                delete data.alpha2Code;
                delete data.alpha3Code;
                delete data.region;
                res.status(status).send(data)
            })
        } else if (searchText.length === 2 || searchText.length === 3) {
            details = countryByCode(searchText, (error, data, status) => {
                if (error) {
                    return res.status(status).send(error)
                }
                delete data.alpha2Code;
                delete data.alpha3Code;
                delete data.region;
                res.status(status).send(data)
            })
        } else {
            searchText = req.query.searchText.toLowerCase()
            countryByName(searchText, (error, data, status) => {
                if (error) {
                    countryByCapital(searchText, (error, data, status) => {
                        if (error) {
                            return res.status(status).send(error)
                        }
                        delete data.alpha2Code;
                        delete data.alpha3Code;
                        delete data.region;
                        res.status(status).send(data)
                    })
                } else {
                    delete data.alpha2Code;
                    delete data.alpha3Code;
                    delete data.region;
                    res.status(status).send(data)
                }
            })
        }
    } catch (e) {
        res.status(400).send()
    }
})



module.exports = router