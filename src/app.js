// Require express
const { response } = require("express")
const express = require("express")
// Require hbs for load partials
const hbs = require("hbs")
const path = require("path")
const geocodificacion = require("./utils/geocodificacion")
const pronostico = require("./utils/pronostico")


// express() función to create a new Express application
const app = express()


// Config app engine
app.set("view engine","hbs")
// Serving static files
app.use(express.static('public'))

// RegisterPartials methon for create shared templates
hbs.registerPartials(path.join(__dirname, "../", '/views/partials'));


// Setup Handler for an HTTP GET request
// First argument: path to view
// Second argument: function to run when the path is visited
app.get("/", function(request, response){
    //Send a message as responese, which is showed in the browser
    response.render("index", {
        title:"Weather App",
        name:"Patricia Figueroa"})
})

app.get("/getweather", function(request,response){
    if(!request.query.address){
        return response.send({
            error: "You have to provide an address!"
        })
    }

    geocodificacion(request.query.address,(error,data)=>{
        if(error){
            return console.log("Error: " , error)
        }
        //console.log("Geocodificacion: ", data)
        pronostico(data.latitude,data.longitude, (error,data)=>{
            if (error){
                return console.log("Error :", error)
            }
            console.log("Pronostico :", data)
            response.send(
                {
                weather_description: data.weather_descriptions,
                temperature: data.temperature,
                feelslike: data.feelslike,
                precip: data.precip
            }) 
        })
    })

    
    // Aquí sería en el caso de que exita el query string con el parámetro addres
})



app.get("/weather", function(request,response){
    response.render("weather")
})

app.get("/about", function(request,response){
    response.render("about",{title:"About", name:"Patricia Figueroa"})
})

app.get("/help", function(request,response){
    response.send("Help")
})


app.get("*", function(request,response){
    response.render("404",{
        title: "404",
        name: "Patricia Figueroa",
        errorMessage: "Page not found!"
    })
})
app.listen(3000,function(){
    console.log("Server is up on port 3000")
    console.log(path.join(__dirname, "../", '/views/partials'))
    //C:\Users\Elizabeth\Desktop\MARZO - JUNIO 2021 - copia\Lenguajes Web\patricia-figueroa.github.io-master\weather-app-final\views\partials\header.hbs
})