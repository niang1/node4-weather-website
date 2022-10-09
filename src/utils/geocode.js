const request = require('request')

const geocode = (address, callback) =>{
    url="https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibmlhbmcxIiwiYSI6ImNsMmN6cHkzdzBuMXMzZHFyazJnbGNxaG4ifQ.UmwzcaYU3x57msjSjyMvUw&limit=1"
    request({url:url, json:true}, (error,response) =>{
        if (error)
            callback("Unable to access geocode service", undefined)
        else if (response.body.features.length===0)
            callback("Unable to find location", undefined)
            else
            {
                callback(undefined, {
                    latitude : response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })
            }
    })
}


module.exports = geocode