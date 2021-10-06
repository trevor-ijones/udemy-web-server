const request = require('request')

const geocode = (address,callback) => {
    const mapboxEndpoint = 'geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json'
    const mapboxToken = 'pk.eyJ1IjoidHJldm9yLWlqb25lcyIsImEiOiJja3RzMmVyMnMxY2FzMnBudHo1MTFrYTVzIn0.HFpx0HupUvfubtL99Y1ugA'
    const mapboxURL = 'https://api.mapbox.com/'+mapboxEndpoint+
                  '?access_token='+mapboxToken+'&limit=1'
    request({url: mapboxURL, json:true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to location services',undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.  Try another search',undefined)
        } else {
          const location = {
              location: body.features[0].place_name,
              latitude: body.features[0].center[1],
              longitude: body.features[0].center[0]
            }
            callback(undefined,location)
        }
    })
}

module.exports = geocode
