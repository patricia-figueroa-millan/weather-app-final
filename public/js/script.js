
const addres = document.querySelector("input")
const boton = document.querySelector("#submit")
const message_1 = document.querySelector("#message-1")
const message_2 = document.querySelector("#message-2")
const message_3 = document.querySelector("#message-3")
const message_4 = document.querySelector("#message-4")

boton.addEventListener("click", (e)=>{
    const location = addres.value
    console.log(location)
    fetch("/getweather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message_1.textContent=data.errorhh
            }else{
                message_1.textContent=data.weather_description
                message_2.textContent=data.temperature
                message_3.textContent=data.precip
                message_4.textContent=data.feelslike
            }
        })
    })
})