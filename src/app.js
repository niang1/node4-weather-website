const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()
const port= process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup  handlbars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Niang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a help Text',
        title: 'Help',
        name: 'Niang'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About  App',
        name: 'Niang'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error)
            return res.send({error})
        forecast(longitude, latitude, (error, forecastData) => {
            if (error)
            return res.send({error})
            res.send ({
                forecast: forecastData.forecast,
                location,
                address: req.query.address
            })
       
    })

})
})

/* res.send(
    {
        forecast: "hhh",
        location: "kkkk",
        address: req.query.address
    }
) */

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: "404",
        name: 'Niang',
        errorMessage: 'Help article not found !!!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: 'Niang',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log("The server is listen on port", port)
})