const request = require('request')

const weatherByCity = (city, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHERAPIKEY}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to API', undefined, 503)
        }
        else if (body.cod === '400') {
            callback({
                status: 400,
                message: body.message
            }, undefined, 400)
        }
        else if (body.cod === '404') {
            callback({
                status: 404,
                message: "weather data not found"
            }, undefined, 404)
        }
        else {
            const data = getObject(body)
            return callback(undefined, data, 200)
        }
    })
}

const weatherByPincode = (pincode, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${pincode},in&appid=${process.env.OPENWEATHERAPIKEY}`
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to API', undefined, 503)
        }
        else if (body.cod === '400') {
            callback({
                status: 400,
                message: body.message
            }, undefined, 400)
        }
        else if (body.cod === '404') {
            callback({
                status: 404,
                message: "weather data not found"
            }, undefined, 404)
        }
        else {
            const data = getObject(body)
            return callback(undefined, data, 200)
        }
    })
}


const weatherByCords = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${process.env.OPENWEATHERAPIKEY}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to API', undefined, 503)
        }
        else if (body.cod === '400') {
            callback({
                status: 400,
                message: body.message
            }, undefined, 400)
        }
        else if (body.cod === '404') {
            callback({
                status: 404,
                message: "weather data not found"
            }, undefined, 404)
        }
        else {
            const data = getObject(body)
            return callback(undefined, data, 200)
        }
    })
}

const getObject = (body)=>{
    return {
        country: body.sys.country,
        name: body.name,
        temp: body.main.temp -273.15,
        min_temp: body.main.temp_min - 273.15,
        max_temp: body.main.temp_max -273.15,
        latitude:body.coord.lat,
        longitude: body.coord.lon
    }
}


module.exports = {
    weatherByCity,
    weatherByCords,
    weatherByPincode
}