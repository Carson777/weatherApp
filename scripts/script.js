var baseURL = "https://api.darksky.net/forecast/ad12c7069e70252ac9f51aa7f1c17649"
var weatherNode = document.querySelector('.display')
var nowButton = document.querySelector('.nowButton')
var hourlyButton = document.querySelector('.hourlyButton')
var dailyButton = document.querySelector('.dailyButton')
var buttonStatus = {
	now: true,
	hourly: false,
	daily: false
}
var weatherData = ""

var displayController = function(){
	console.log(weatherData)
	if(buttonStatus.now){
		weatherNode.innerHTML = "<h3 class = 'currentTemp'>" + " Current Temperature: " + Math.floor(weatherData.currently.temperature) + "</h3>"
	} else if (buttonStatus.hourly){
		var placeholder = ""
		for(var i = 0; i < 24; i++){
			placeholder += "<div class = 'hourlyTemp'><p class = 'hourlyTime'>" + [i] + " Hours from now</p><p class = 'hourlyApparantTemp'>temp: " + Math.floor(weatherData.hourly.data[i].apparentTemperature) + "</p><p class = 'hourlyDataSummary'>" + weatherData.hourly.data[i].summary + "</p></div>"
		}	
		weatherNode.innerHTML = placeholder
	} else {
		var placeholder = ""
		for(var i = 0; i < 7; i++){
			placeholder += "<div class = 'dailyTemp'><p class = 'dailyTime'>" + [i] + " Days from now</p><p class = 'dailyApparantTemp'>temp: " + Math.floor(((weatherData.daily.data[i].apparentTemperatureMax + weatherData.daily.data[i].apparentTemperatureMin)/2)) + "</p><p class = 'dailyDataSummary'>" + weatherData.daily.data[i].summary +"</p></div>"
		}
		weatherNode.innerHTML = placeholder
	}
}

var getWeatherData = function(apiResponse){
	//takes the data and asigns it to weatherData, then calls display controller
	weatherData = apiResponse
	displayController(weatherData)

}

var successFunction = function(positionObject){
	//obtains long/lat, attaches them to URL, and request API from dark sky, then it passes the data to getWheather data
	var long = positionObject.coords.longitude
	var lat = positionObject.coords.latitude
	var weatherURL = baseURL + '/' + lat + ',' + long
	var promise = $.getJSON(weatherURL)
	promise.then(getWeatherData)
	nowButton.addEventListener('click', nowSelected)
	hourlyButton.addEventListener('click', hourlySelected)
	dailyButton.addEventListener('click', dailySelected)

}

var nowSelected = function(eventObject){
	nowButton.style.background = "yellow"
	hourlyButton.style.background = "grey"
	dailyButton.style.background = "grey"
	buttonStatus.now = true
	buttonStatus.hourly = false
	buttonStatus.daily = false
	console.log(buttonStatus)
	displayController()
	
}

var hourlySelected = function(eventObject){
	nowButton.style.background = "grey"
	hourlyButton.style.background = "yellow"
	dailyButton.style.background = "grey"
	buttonStatus.now = false
	buttonStatus.hourly = true
	buttonStatus.daily = false
	console.log(buttonStatus)
	displayController()
	
}
var dailySelected = function(eventObject){
	nowButton.style.background = "grey"
	hourlyButton.style.background = "grey"
	dailyButton.style.background = "yellow"
	buttonStatus.now = false
	buttonStatus.hourly = false
	buttonStatus.daily = true
	console.log(buttonStatus)
	displayController()
	
}

navigator.geolocation.getCurrentPosition(successFunction)

