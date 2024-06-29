
//today
let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayconditionimg = document.getElementById("today_condition_img")
let todayconditiontext = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let winddirection = document.getElementById("wind_direction")


//nextData
let nextDay = document.getElementsByClassName("next_day_name ")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition_text")

//searchInput
let searchInput = document.getElementById("search")

// let data = new Date("2024-01-15")
// console.log(data.getDate());
// console.log(data.toLocaleDateString("en-us", {weekday:"long"}));
// console.log(data.toLocaleDateString("en-us", {month:"long"}));

//fetchData
async function getWeatherData(cityName){
   let WeatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d5431e3e0f9b4b40836180744241501&q=${cityName}&days=3`)
   let WeatherData = await WeatherResponse.json()
   return WeatherData
}



//display today data
function displayTodayData(data){
    let todayDate =  new Date()
    todayName.innerHTML = todayDate.toLocaleString("en-us", {weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleString("en-us" ,{month : "long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML= data.current.temp_c
    todayconditionimg.setAttribute("src", data.current.condition.icon )
    todayconditiontext.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    winddirection.innerHTML= data.current.wind_dir
}
//display next Days data

function displayNextData(data){
   
let forecastData = data.forecast.forecastday

for(let i = 0 ; i < 2 ; i++){
    let nextDate =  new Date(forecastData[i+1].date)
    // console.log(nextDate);
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us", {weekday:"long"} )
  nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
  nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
  nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
  nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
}
}
//start app

async function startApp(city="cairo"){
   let WeatherData = await getWeatherData(city)
   if(!WeatherData.error){
    displayTodayData(WeatherData)
    displayNextData(WeatherData)
   }

}
startApp()

searchInput.addEventListener("input", function(){
    startApp(searchInput.value)
})

