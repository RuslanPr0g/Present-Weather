const log = console.log;

const request = require('request');

const _units = 'units=si'

let latitude = '46.47747'; let longitude = '30.73262'; // Odessa, Ukraine

let the_adress = 'Odessa, Odesskaya oblast'; // = input('Your Country: ')

const geocoding_url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + the_adress + '.json?access_token=pk.eyJ1IjoicnVzbGFucHJvZyIsImEiOiJjazU5cjlpNWowb2IyM2RyZnJqM2dyNzdqIn0.ozdJTwPL2kb8cLFHA53JTw&limit=1'

request({ url: geocoding_url, json: true}, (error, response) => {
    if(error)
    {
        log('There is some problem with connecting to the geocoding...')
    }
    else
    {
        latitude = response.body.features[0].center[1]
        longitude = response.body.features[0].center[0]
    }
})

const url = 'https://api.darksky.net/forecast/b97b17f7219eb126257cc47106b5147b/' + latitude + ',' + longitude + '?' + _units;

request({ url: url, json: true }, (error, response) => {
   
    /* *****ERROR***** */
    if(error){
        log('There is no connection to the weather service.')
        log('* Check your Wi-Fi.')
        log('* ReBoot your device.')
        log('** ReInstall app.')
    }
    else if(!response.body.currently){log('Wrong adress or service is not respond.')}
    /* *****RESPONSE***** */
    else{
        let _desTemp

        const _temperature = response.body.currently.temperature

        if(_units === 'units=si')
        {
            if(_temperature <= 0.1){_desTemp = ' frozen water'}
            if(_temperature > 0.1 && _temperature < 10){_desTemp = ' enough cold'}
            if(_temperature > 10 && _temperature < 30){_desTemp = ' warm'}
            if(_temperature > 30){_desTemp = ' too hot'}
        }


        log(response.body.daily.data[0].summary + ' It is currently ' + _temperature + _desTemp + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
    }
    // _desTemp - to describe the temperature
})

// https://api.mapbox.com/geocoding/v5/mapbox.places/Odessa%20Oblast,%20Ukraine.json?access_token=pk.eyJ1IjoicnVzbGFucHJvZyIsImEiOiJjazU5cjlpNWowb2IyM2RyZnJqM2dyNzdqIn0.ozdJTwPL2kb8cLFHA53JTw&limit=1
// https://docs.mapbox.com/api/search/

