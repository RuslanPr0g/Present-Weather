const log = console.log

const path = require('path')
const express = require("express")
const main_path = path.join(__dirname, '../public')
const app = express()

app.use(express.static(main_path))

app.get('/weather', (req, res) => {
    res.send([{
        forecast: 'snowing',
        location: 'Odessa'
    }])
})

app.listen(3000, () => {
    log('Server is up.')
})



