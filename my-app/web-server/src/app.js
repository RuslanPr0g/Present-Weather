const log = console.log

const path = require('path')
const hbs = require('hbs')
const express = require("express")
const main_path = path.join(__dirname, '../public')
const app = express()

//  Define paths for express config
const __host = 3001
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
    res.send([{
        forecast: 'snowing',
        location: 'Odessa'
    }])
})

app.listen(__host, () => {
    log('Server is up on ' + __host)
})



