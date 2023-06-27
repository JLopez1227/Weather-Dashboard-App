var APIKey = "57316fb3ae671e8e118adbe4ee47279e";
var country = "US";
var latitude = "";
var longitude = "";
var searchInput = document.getElementById('searchInput');
var searchButton = document.getElementById('searchButton');
const fiveDayDiv = document.getElementById('fiveDayForecast');

function fiveDayWeather(fiveDayData){
  const forecastArray = fiveDayData.list

  for (let index = 0; index < forecastArray.length; index +=8) {
    const fiveDay = forecastArray[index];
    const displayForecast = document.createElement('div');
    const displayDate = document.createElement('h4');
    const icon = fiveDay.weather[0].icon
    const iconEl = document.createElement('img');
    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    iconEl.setAttribute('src', iconUrl)



    const date = fiveDay.dt_txt
    const humidity = fiveDay.main.humidity
    const windSpeed = fiveDay.wind.speed
    const temp = fiveDay.main.temp

    

    fiveDayDiv.innerHTML = date + humidity + windSpeed + temp

    fiveDayDiv.appendChild(iconEl)

    console.log(fiveDay);
  }
}

function testWeather(){
    var inputValue = searchInput.value;
    var city = inputValue;
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
      APIKey + '&units=imperial';
    fetch(coordinateURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIKey + '&units=imperial';
        fetch(forecastURL).then(function (response) {
          return response.json();
        }).then(function(forecastData){
          console.log(forecastData);
          fiveDayWeather(forecastData)
        })

      });
  });
}

 searchButton.addEventListener("click", function(){
    testWeather();
 })

