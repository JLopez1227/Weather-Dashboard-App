var APIKey = "57316fb3ae671e8e118adbe4ee47279e";
var country = "US";
var latitude = "";
var longitude = "";
var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton");


function fiveDayWeather(fiveDayData) {
  const forecastArray = fiveDayData.list;
  const fiveDayDiv = document.getElementById("fiveDayForecast");
  fiveDayDiv.innerHTML = '';

  for (let index = 0; index < forecastArray.length; index += 8) {
    const fiveDay = forecastArray[index];
    const displayForecast = document.createElement("div");
    displayForecast.classList.add("forecastItem");
    const displayDate = document.createElement("h4");
    const displayHumidity = document.createElement("p");
    const displayWindSpeed = document.createElement("p");
    const displayTemp = document.createElement("p");
    const icon = fiveDay.weather[0].icon;
    const iconEl = document.createElement("img");
    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    iconEl.setAttribute("src", iconUrl);

    const date = new Date(fiveDay.dt * 1000).toLocaleDateString();
    const humidity = fiveDay.main.humidity;
    const windSpeed = fiveDay.wind.speed;
    const temp = fiveDay.main.temp;

    displayDate.textContent = date;
    displayHumidity.textContent = "Humidity: " + humidity + "%";
    displayWindSpeed.textContent = "Wind Speed: " + windSpeed + " MPH";
    displayTemp.textContent = "Temperature: " + temp + " °F";
    displayForecast.appendChild(displayDate);
    displayForecast.appendChild(displayHumidity);
    displayForecast.appendChild(displayWindSpeed);
    displayForecast.appendChild(displayTemp);
    displayForecast.appendChild(iconEl);

    fiveDayDiv.appendChild(displayForecast);

    console.log(fiveDay);
  }
}

function singleDayWeather(singleDayData) {
  console.log(singleDayData);
  const currentDay = document.getElementById("currentDiv");
  currentDay.innerHTML = '';
  const displayHumidity = document.createElement("p");
  const displayWindSpeed = document.createElement("p");
  const displayTemp = document.createElement("p");
  const displayDate = document.createElement("p");
  const todayForecast = document.createElement('h2');

  const date = new Date(singleDayData.dt * 1000).toLocaleDateString();
  const humidity = singleDayData.main.humidity;
  const windSpeed = singleDayData.wind.speed;
  const temp = singleDayData.main.temp;
  const icon = singleDayData.weather[0].icon;
  const iconEl = document.createElement("img");
  var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
  iconEl.setAttribute("src", iconUrl);

  displayDate.textContent = "Date: " + date;
  displayHumidity.textContent = "Humidity: " + humidity + "%";
  displayTemp.textContent = "Temperature: " + temp + " °F";
  displayWindSpeed.textContent = "Wind Speed: " + windSpeed + " MPH";
  todayForecast.textContent = "Today's Forecast:"

  currentDay.appendChild(todayForecast)
  currentDay.appendChild(displayDate);
  currentDay.appendChild(displayHumidity);
  currentDay.appendChild(displayWindSpeed);
  currentDay.appendChild(displayTemp);
  currentDay.appendChild(iconEl);
}

function displayCityHistory() {
  var storage = localStorage.getItem("cities");
  var cities = JSON.parse(storage) || [];
  const citiesDiv = document.getElementById('cityHistory')
  citiesDiv.innerHTML= ''
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const btn = document.createElement('button');
    btn.classList.add('cityBtn')
    btn.textContent = city
    citiesDiv.appendChild(btn);

  }
}
  displayCityHistory();

function testWeather() {
  var inputValue = searchInput.value;
  var city = inputValue;
  //add to local storage
  var storage = localStorage.getItem("cities");
  var cities = JSON.parse(storage) || [];
  cities.push(city)
  var stringifyStorage = JSON.stringify(cities);
  localStorage.setItem('cities', stringifyStorage)
  displayCityHistory();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "," +
    country +
    "&appid=" +
    APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      latitude = data.coord.lat;
      console.log(latitude);
      longitude = data.coord.lon;
      console.log(longitude);
      var coordinateURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIKey +
        "&units=imperial";
      fetch(coordinateURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          singleDayWeather(data);
          var forecastURL =
            "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=" +
            APIKey +
            "&units=imperial";
          fetch(forecastURL)
            .then(function (response) {
              return response.json();
            })
            .then(function (forecastData) {
              console.log(forecastData);
              fiveDayWeather(forecastData);
            });
        });
    });
}

searchButton.addEventListener("click", function () {
  testWeather();
});

// btn.addEventListener('click', function(){
  //add function to pull up previous search data
// })
