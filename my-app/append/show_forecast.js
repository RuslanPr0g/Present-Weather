const log = console.log;

const request = require('request');

let units = 'si';

let _temperature, _desTemp;

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/b97b17f7219eb126257cc47106b5147b/' + latitude + ',' + longitude + '?' + 'units=' + units;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(('There is no connection to the weather service.'), undefined)
        } else if (response.body.error) {
            callback('Wrong adress or service is not respond.', undefined)
        } 
        else {
            _temperature = response.body.currently.temperature
            if(units === 'si')
                { 
                    if(_temperature <= 0.1){_desTemp = ' frozen water'}
                    if(_temperature > 0.1 && _temperature < 10){_desTemp = ' enough cold'}
                    if(_temperature > 10 && _temperature < 30){_desTemp = ' warm'}
                    if(_temperature > 30){_desTemp = ' too hot'}
                }
                callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + _temperature + _desTemp + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast