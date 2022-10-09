const request = require("request")
const forecast = (longitude, latitude, callback) => {
    url ="http://api.weatherstack.com/current?access_key=f2a307b8f3ba9a68035fd4acb828bb58&query=" + longitude + "," + latitude
    request({url:url, json: true}, (error, response)=>{
        if (error)
        callback("Enable to connect to weather service !!", undefined)
        else if (response.body.error)
        callback("Unable to find location", undefined)
        else
        {
            callback(undefined, 
                {
                    location : response.body.location.name,
                    forecast : response.body.current.weather_descriptions[0] + " temperature : " + response.body.current.temperature + " feelslike : " + response.body.current.feelslike
                })
                
        }
    })
}

module.exports = forecast