var baseURL = "https://api.darksky.net/forecast/ad12c7069e70252ac9f51aa7f1c17649"

var getWeatherData = function(apiResponse){
	console.log(apiResponse)
}

var successFunction = function(positionObject){
	console.log(positionObject)
	var long = positionObject.coords.longitude
	var lat = positionObject.coords.latitude
	var weatherURL = baseURL + '/' + lat + ',' + long
	var promise = $.getJSON(weatherURL)
	promise.then(getWeatherData)

}


navigator.geolocation.getCurrentPosition(successFunction)

if ("geolocation" in navigator) {
  console.log("available")
} else {
  console.log("unavailable")
}