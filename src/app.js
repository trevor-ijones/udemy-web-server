const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')
const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Habdlebars Engine & Views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Trevor Jones'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Trevor Jones'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Trevor Jones',
        helpText: 'Do the things - all of the things'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode (req.query.address,(error,{latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({
                error: 'Error getting location:'+error
            })
        } 
        
        forecast(latitude,longitude,(error,{description,temperature,feelslike}={}) => {
            if (error) {
                return res.send({
                    error: 'error getting forecast '+error
                })
            } 
            res.send({
                address: req.query.address,
                location: location,
                description: description,
                forecast: 'It is currently '+temperature+' degrees out, and feels like '+feelslike
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 'Error 404 - Page not found',
        name: 'Trevor Jones',
        errorMessage: 'Help article not found'
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        title: 'Error 404 - Page not found',
        name: 'Trevor Jones',
        errorMessage: 'The page you were looking for could not be found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})