var unirest = require("unirest");

const covidByCountry = async (country, callback) => {
	var req = unirest("GET", "https://rapidapi.p.rapidapi.com/country");
	
	req.query({
		"name": country
	});

	req.headers({
		"x-rapidapi-key": process.env.RAPIDAPIKEY,
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"useQueryString": true
	});


	req.end(function (res) {
		if (res.error) {
			return callback("Couldnt find response", undefined, 400)
		}
		
		if (res.body.length === 0) {
			return callback({
				status: 404,
				message: 'no records found'
			}, undefined, 404)
		}
		var data = getObject(res.body[0])

		return callback(undefined, data, 200)
	});
}

const covidByCountryCode = (countryCode, callback) => {
	var req = unirest("GET", "https://rapidapi.p.rapidapi.com/country/code");
	
	req.query({
		"code": countryCode
	});

	req.headers({
		"x-rapidapi-key": process.env.RAPIDAPIKEY,
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"useQueryString": true
	});


	req.end(function (res) {
		if (res.error) {
			return callback("Couldnt find response", undefined, 400)
		}
		
		if (res.body.length === 0) {
			return callback({
				status: 404,
				message: 'no records found'
			}, undefined, 404)
		}
		var data = getObject(res.body[0])

		return callback(undefined, data, 200)
	});
}

const getObject = (body) => {
	return {
		country: body.country,
		confirmed: body.confirmed,
		recovered: body.recovered,
		critical: body.critical,
		deaths: body.deaths
	}
}


module.exports = {
	covidByCountry,
	covidByCountryCode
}
