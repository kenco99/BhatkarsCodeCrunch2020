const request = require('request')
const searchAlternate = require('../utils/stringSearch')

const countryByName = (country, callback) => {
    const url = `https://restcountries.eu/rest/v2/name/${country}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to API', undefined, 503)
        }
        else if (body.status === 404) {
            callback({
                status: 404,
                message: 'country not found'
            }, undefined, 404)
        }
        else if (body.status === 400) {
            callback('Bad request: Incorrect Search. Please try again', undefined, 400)
        }
        else {
            var details = {}
            var flag = false
            for(var i=0; i< body.length; i++){
                if((body[i].name.toLowerCase() === country) || (searchAlternate(country, body[i].altSpellings))  ){
                    flag = true
                    details = getObject(body[i])
                }
            }

            if(flag){
                return callback(undefined, details, 200)
            }
            callback("Sorry could not find an accurate result. Please try refining your search", undefined)
        }
    })
}

const countryByCode = (code, callback) => {
    const url = `https://restcountries.eu/rest/v2/alpha/${code}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to API', undefined, 503)
        }
        else if (body.status === 404) {
            callback({
                status: 404,
                message: 'country not found'
            }, undefined, 404)
        }
        else if (body.status === 400) {
            callback('Incorrect Search. Please try again', undefined, 400)
        }
        else {
            var details = getObject(body)
            callback(undefined, details, 200)
            
        }
    })
}

const countryByCallingCode = (callingcode, callback) => {
    const url = `https://restcountries.eu/rest/v2/callingcode/${callingcode}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to API', undefined, 503)
        }
        else if (body.status === 404) {
            callback({
                status: 404,
                message: 'country not found'
            }, undefined, 404)
        }
        else if (body.status === 400) {
            callback('Incorrect Search. Please try again', undefined, 400)
        }
        else {
            var details = getObject(body[0])
            callback(undefined, details, 200)
        }
    })
}



const countryByCapital = (capital, callback) => {
    const url = `https://restcountries.eu/rest/v2/capital/${capital}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to API', undefined, 503)
        }
        else if (body.status === 404) {
            callback({
                status: 404,
                message: 'country not found'
            }, undefined, 404)
        }
        else if (body.status === 400) {
            callback('Incorrect Search. Please try again', undefined, 400)
        }
        else {
            var details = getObject(body[0])
            callback(undefined, details, 200)
        }
    })
}


const getObject = (body)=>{
    return {
        name: body.name,
        alpha2Code: body.alpha2Code,
        alpha3Code: body.alpha3Code,
        capital: body.capital,
        region: body.region,
        population: body.population,
        flag: body.flag,
        totalLanguages: body.languages.length,
        totalCurrencies: body.currencies.length,
        totalTimezones: body.timezones.length
    }
}

module.exports = {
    countryByName,
    countryByCode,
    countryByCallingCode,
    countryByCapital
}