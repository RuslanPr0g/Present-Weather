const log = console.log

const path = require('path')
const hbs = require('hbs')
const express = require("express")
const main_path = path.join(__dirname, '../public')
const app = express()
const _geo = require('./append/geocode')
const show_forecast = require('./append/show_forecast')

//  Define paths for express config
const __host = (process.argv[2]); // chose the host
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//  Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//  Setup static directory to serve
app.use(express.static(main_path))

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Present Weather',
        name: 'forecast'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'FAQ',
        name: 'Open all...'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Present Weather',
        name: 'Present relevant forecast in your city!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'There is no any address...'
        })
    }

    _geo(req.query.address, (error, { latitude, longitude, location }={}) => {
        if(error){
            return res.send({ error })
        }
        show_forecast(latitude, longitude, (error, fdata) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: fdata,
                location,
                address: req.query.address
            })
        })
    })


    // res.send([{
    //     forecast: ,
    //     location: req.query.address,
    // }])
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'Nothing to search...'
        })
    }
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 HELP',
        error_404_message: 'HELP PAGE NOT FOUND...'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        error_404_message: '404'
    })
})

app.listen(__host, () => {
    log('Server is up on ' + __host)
})



