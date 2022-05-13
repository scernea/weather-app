let time = document.querySelector("#text-time");
let date = document.querySelector("#text-day");
let now = new Date();
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = now.getDay();
date.innerHTML = `${days[day]}`;
time.innerHTML = `${hour}:${minutes}`;

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = days[date.getDay()];
  return `${hours}:${minutes}`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bf201b8646cb6bb4516f64fb25eed406";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let timeElement = document.querySelector("#text-time");
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#text-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  changeIcon(iconElement, response.data.weather[0].main);
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row col-one" align="center"><div>`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div>
          <img src="media/cloudy-03.png" class="img-responsive icon-medium">
          <span class="overlay-text-day">${day}</span><br />
          <span class="overlay-text-degrees-max">16°</span>
          <span class="overlay-text-degrees-min">12°</span>
      </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function changeIcon(iconElement, iconChange) {
  if (iconChange === "rainy" || iconChange === "Rain") {
    iconElement.setAttribute("src", "media/rain-02.png");
  } else if (
    iconChange === "cloudy" ||
    iconChange === "Clouds" ||
    iconChange === "overcast clouds"
  ) {
    iconElement.setAttribute("src", "media/cloudy-03.png");
  } else if (iconChange === "Snow" || iconChange === "snowy") {
    iconElement.setAttribute("src", "media/rain-02.png");
  } else if (
    iconChange === "sunny" ||
    iconChange === "hot" ||
    iconChange === "sun" ||
    iconChange === "Clear"
  ) {
    iconElement.setAttribute("src", "media/sun.png");
  } else if (
    iconChange === "stormy" ||
    iconChange === "storms" ||
    iconChange === "Thunderstorm" ||
    iconChange === "Drizzle"
  ) {
    iconElement.setAttribute("src", "media/rain-02.png");
  } else {
    iconElement.setAttribute("src", "media/sun.png");
  }
}

function searchCity(city) {
  let apiKey = "bf201b8646cb6bb4516f64fb25eed406";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit() {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "bf201b8646cb6bb4516f64fb25eed406";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");

currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("San Francisco");

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#text-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#text-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;
searchCity("San Francisco");
