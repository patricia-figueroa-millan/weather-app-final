const request = require('request')

let longitude
let latitude

const geocodificacion = (address, callback) => {
    const url_geocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGF0cmljaWFmaWd1ZXJvYW1pbGxhbiIsImEiOiJjazlsNnhpZmEwYnptM2VtdTl6N2phM3h6In0.DB69EftrbSS93hE_zslctQ&limit=1&language=es'
    request({ url: url_geocoding, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect with Mapbox server", undefined)

        } else if (body.message) {
            callback("Not found!", undefined)

        } else if (body.features.length == 0) {
            callback("Unable to finde location, try another search!", undefined)

        } else {
            longitude = body.features[0].center[0]
            latitude = body.features[0].center[1]
            callback(undefined, {
                longitude: longitude,
                latitude: latitude
            })
        }

    })
}



module.exports = geocodificacion