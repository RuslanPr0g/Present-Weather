const log = console.log;

const _geo = require('./append/geocode')

const show_forecast = require('./append/show_forecast')

const the_address = (process.argv[2]);
   
if (!the_address) {
    log('There is no any adress to connect...')
} else {
    _geo(the_address, (error, { latitude, longitude }) => {
        if (error) {
            return log(error)
        }
        show_forecast(latitude, longitude, (error, forecast_Data) => {
            if (error) {
                return log(error)
            }
            log(forecast_Data)
        })
    })
}