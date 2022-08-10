// Date Info

let now = new Date();
let date = document.querySelector("#current-time-shown");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let formattedDate = `${
  days[now.getDay()]
} ${now.getHours()}:${now.getMinutes()}`;

date.innerText = `Last Updated: ${formattedDate}`;

// Searched Weather Info

let cityForm = document.querySelector("#city-form");
cityForm.onsubmit = handleCityFormSubmit;

function handleCityFormSubmit(event) {
  event.preventDefault();
  let apiKey = "d45d592e53d543bbc30e23d2221f11ea";
  let tempUnit = "imperial";
  let cityInput = document.querySelector("#city-input");
  let apiUrlByCityName = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${tempUnit}`;
  axios.get(apiUrlByCityName).then(inputSearchedCityData);
}
function inputSearchedCityData(response) {
  console.log(response);
  let temperature = response.data.main.temp;
  temperature = Math.round(fahrenheitTemperature);
  let currentTemp = document.getElementById("current-temperature");
  currentTemp.innerText = `${temperature}°`;
  let roundedFeelsLike = Math.round(response.data.main.feels_like);
  let feelsLike = document.getElementById("feels-like");
  feelsLike.innerText = `Feels Like: ${roundedFeelsLike}°`;
  let humidity = document.getElementById("humidity");
  humidity.innerText = `Humidity: ${response.data.main.humidity}%`;
  let roundedWindSpeed = Math.round(response.data.wind.speed);
  let windSpeed = document.getElementById("wind");
  windSpeed.innerText = `Wind: ${roundedWindSpeed}mph`;
  let weatherDescriptor = document.getElementById("current-weather-type");
  weatherDescriptor.innerText = response.data.weather[0].description;
  let shownCity = document.getElementById("currently-shown-city");
  shownCity.innerText = response.data.name;
  let weatherIcon = document.getElementById("weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  fahrenheitTemperature = response.data.main.temp;
}

// Current Weather Info

let button = document.getElementById("current-location-button");
button.addEventListener("click", grabLocation);
window.onload = grabLocation;
function grabLocation() {
  navigator.geolocation.getCurrentPosition(grabLocationInfo);
}

function grabLocationInfo(position) {
  let apiKey = "e30d83b612b6686b6709aaec2ca39358";
  let tempUnit = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlByGeoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${tempUnit}`;
  axios.get(apiUrlByGeoLocation).then(inputCurrentLocationInfo);
}
function inputCurrentLocationInfo(response) {
  console.log(response);
  let temperature = response.data.main.temp;
  temperature = Math.round(response.data.main.temp);
  let currentTemp = document.getElementById("current-temperature");
  currentTemp.innerText = `${temperature}°`;
  let roundedFeelsLike = Math.round(response.data.main.feels_like);
  let feelsLike = document.getElementById("feels-like");
  feelsLike.innerText = `Feels Like: ${roundedFeelsLike}°`;
  let humidity = document.getElementById("humidity");
  humidity.innerText = `Humidity: ${response.data.main.humidity}%`;
  let roundedWindSpeed = Math.round(response.data.wind.speed);
  let windSpeed = document.getElementById("wind");
  windSpeed.innerText = `Wind: ${roundedWindSpeed}mph`;
  let weatherDescriptor = document.getElementById("current-weather-type");
  weatherDescriptor.innerText = response.data.weather[0].description;
  let shownCity = document.getElementById("currently-shown-city");
  shownCity.innerText = response.data.name;
  let weatherIcon = document.getElementById("weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  fahrenheitTemperature = response.data.main.temp;
}

// Unit Conversion

function convertToCelcius(event) {
  event.preventDefault();
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.getElementById("current-temperature");
  temperatureElement.innerText = `${Math.round(celciusTemperature)}°`;
  fahrenheitElement.classList.remove("active");
  celciusElement.classList.add("active");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("current-temperature");
  temperatureElement.innerText = `${Math.round(fahrenheitTemperature)}°`;
  fahrenheitElement.classList.add("active");
  celciusElement.classList.remove("active");
}

let fahrenheitTemperature = null;

let celciusElement = document.getElementById("celcius");
celciusElement.addEventListener("click", convertToCelcius);

let fahrenheitElement = document.getElementById("fahrenheit");
fahrenheitElement.addEventListener("click", convertToFahrenheit);
