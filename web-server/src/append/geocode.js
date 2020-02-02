const log = console.log

const request = require('request');

const to_geo = (the_address, callback) => {
    const geocoding_url= encodeURI('https://api.mapbox.com/geocoding/v5/mapbox.places/' + the_address + '.json?access_token=pk.eyJ1IjoicnVzbGFucHJvZyIsImEiOiJjazU5cjlpNWowb2IyM2RyZnJqM2dyNzdqIn0.ozdJTwPL2kb8cLFHA53JTw&limit=1');
    request({ url: geocoding_url, json: true }, (error, { body = {} }) => {
        if (error) {
            callback('Server is not respond...', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

 module.exports = to_geo