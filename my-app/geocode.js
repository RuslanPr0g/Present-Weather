const log = console.log

const request = require('request');

setTimeout(()=>{
    log('...')
}, 50)

const to_geo = (geocoding_url, data) => {
        setTimeout(()=>{
            request({ url: geocoding_url, json: true}, (error, response) => {
                if(error)
                {
                    log('There is some problem with connecting to the geocoding.!..')
                }else if(response.body.features.length === 0){
                    log('Unable to find location or url is empty')
                }
                else
                {
                    data.latitude = response.body.features[0].center[1]
                    data.longitude = response.body.features[0].center[0]
                }
            })
        }, 110)
    }

module.exports = {
    to_geo: to_geo,
}