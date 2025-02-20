function refreshWeatherData(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#weather-conditions");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);
  let dateTimeElement = document.querySelector("#dateTime");
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  conditionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  dateTimeElement.innerHTML = formatDateTime(date);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "5a85355e7783a33t5694043ffeoa1b50";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function formatDateTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

let searchFormElement = document.querySelector("#city-search-form");
searchFormElement.addEventListener("submit", handleSearch);

function getForecast(city) {
  let apiKey = "5a85355e7783a33t5694043ffeoa1b50";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day"> 
            <div class="weather-forecast-dayOfWeek">${day}</div> 
            <div class="weather-forecast-icon">⛅ </div> 
            <div class="weather-forecast-temperatures"> 
              <div class="weather-forecast-temperature">
                <strong>17°</strong>
              </div>
              <div class="weather-forecast-temperature"> 
                5°
              </div>
            </div>
          </div>
          `;
  });

  forecastElement.innerHTML = forecastHtml;
}

searchCity("Amsterdam");
