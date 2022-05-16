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
  iconElement.setAttribute("src", `media/${response.data.weather[0].icon}.svg`);
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      let col = "";
      switch (index) {
        case 1:
          col = "col-one";
          break;
        case 2:
          col = "col-two";
          break;
        case 3:
          col = "col-three";
          break;
        case 4:
          col = "col-four";
          break;
        case 5:
          col = "col-five";
          break;
        case 6:
          col = "col-six";
          break;
      }

      forecastHTML =
        forecastHTML +
        `<div class="col ${col}" align="center">
      <div class="maintxt">
        <img
                class="img-responsive icon-medium"
                src="media/${forecastDay.weather[0].icon}.svg"
                alt=""
              />
          <span class="overlay-text-day">${formatDate(
            forecastDay.dt
          )}</span><br />
          <span class="overlay-text-degrees-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span><br />
          <span class="overlay-text-degrees-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
      </div>
      </div>
   `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
  let apiKey = "bf201b8646cb6bb4516f64fb25eed406";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit() {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  document.querySelector("#city-input").value = "";
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
