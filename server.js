const express = require('express')
const bodyParser = require('body-parser')
const request = require('request');
const app = express()

const apiKey = 'be69e25ebd86d45f7b5af3d30e16f838'

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    // Old Code
    // res.send('Hello World!')
    res.render('index')
})


app.post('/', function (req, res) {
    // res.render('index')
    let city = req.body.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weathter: null, error: 'Error, please try again' })
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' })
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`
                res.render('index', { weather: weatherText, error: null })
            }
        }
    })
})

app.listen(3000, function () {
    console.log('Example app listening to port 3000!')
})