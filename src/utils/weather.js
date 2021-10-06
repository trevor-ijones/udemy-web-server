const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const weatherURL = 'http://api.weatherstack.com/current?access_key=81fc753fc0e9412915cf2c6ff26658da&query='+latitude+','+longitude+'&units=m'
    request({url:weatherURL, json:true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weatther service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
          const forecast = {
              description: body.current.weather_descriptions[0],
              temperature: body.current.temperature,
              humidity: body.current.humidity,
              feelslike: body.current.feelslike 
          }
          callback(error,forecast)
        }
      })
}


module.exports = forecast
