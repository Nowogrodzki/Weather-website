const request = require('request')

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiamFuZWs2OTY5IiwiYSI6ImNrNHhqbDYwaDAxaGkzZm1uZWs4YjBsOHcifQ.G5YIWWOD298wOytTYVoW9Q`
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback("Enable to connect with weather-app", undefined)
        } else if (body.message || body.features.length === 0) {
            callback("Unable to find location. Please try another search.", undefined)
        } else {
            callback(undefined, {
                "location": body.features[0].place_name,
                "latitude": body.features[0].center[1],
                "longitude": body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode