const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/6a4d64bd865bd67b831e610940ff13fc/${lat},${long}?units=si`;
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback("Enable to connect with weather-app", undefined)
        } else if (body.error) {
            callback("Something wrong with lat or long", undefined)
        } else {
            callback(undefined, {
                "temperature": `${body.currently.temperature} °C`,
                "Weather": body.currently.summary,
                "timezone": body.timezone
            })
        }
    })
}

module.exports = forecast