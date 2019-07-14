var apiId = '866bb374234f58496d65f3240bbc1a0d';
var units = 'metric';
var searchMethod;

function getSearchMethod (searchTerm){
	if(searchTerm.length == 5 && parseInt(searchTerm) == searchTerm) {
		searchMethod = 'zip'
	} else {
		searchMethod = 'q'
	}
}

function searchWeather(searchTerm){
	getSearchMethod (searchTerm)
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${apiId}&units=${units}`)
	.then(response => {
	 return response.json();
	})
	.then(response =>{
	 init(response);
	})
};

function init(responseFromServer){
	console.log(responseFromServer)
	switch(responseFromServer.weather[0].main) {
		case 'Clouds':
			document.body.style.backgroundImage = 'url("img/cloudy.jpg")';
			break;
		case 'Thunderstorm':
			document.body.style.backgroundImage = 'url("img/storm.jpg")';
			break;
		case 'Drizzle':
		case"Rain":
			document.body.style.backgroundImage = 'url("img/rain.jpg")';
			break;
		case 'Clear':
			document.body.style.backgroundImage = 'url("img/clear.jpg")';
			break;
		case 'Clouds':
			document.body.style.backgroundImage = 'url("img/clear.jpg")';
			break;
		default:
			break;
	}

	const weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
	const cityHeader = document.getElementById('cityHeader');
	const humidity = document.getElementById('humidity');
	const temperature = document.getElementById('temperature');
	const documentIconImg = document.getElementById('documentIconImg');
	const windSpeed = document.getElementById('windSpeed');

	const weatherDescription = responseFromServer.weather[0].description;
	weatherDescriptionHeader.innerHTML = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
	cityHeader.innerHTML = responseFromServer.name;
	humidity.innerHTML = 'Humidity levels at ' + responseFromServer.main.humidity + ' %';
	temperature.innerHTML = Math.floor(responseFromServer.main.temp) +' &#8451';
	windSpeed.innerHTML = "Winds at " + responseFromServer.wind.speed + ' m/s';
	documentIconImg.src =`http://openweathermap.org/img/wn/${responseFromServer.weather[0].icon}.png`;

	setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
	let weatherContainer = document.getElementById('weatherContainer');
	let weatherContainerHeight = weatherContainer.clientHeight;
	let weatherContainerWidth = weatherContainer.clientWidth;

	weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
	weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
	weatherContainer.style.visibility = 'visible';

}

document.getElementById('searchBtn').addEventListener('click', () =>{
	var searchTerm = document.getElementById('searchInput').value;
	if (searchTerm)
	searchWeather(searchTerm);
})
