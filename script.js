import config from "./config.js";

const apiKey = config.apiKey;
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appId=${apiKey}`);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
      let data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      // + ", " + data.sys.country;

      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + " °C";

      document.querySelector(".humidity").innerHTML = data.main.humidity + " %";

      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      // Log weather condition to debug
      console.log("Weather condition:", data.weather[0].main);

      // Update weather icon based on condition
      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "./images/clouds.png";
          break;
        case "Clear":
          weatherIcon.src = "./images/clear.png";
          break;
        case "Rain":
          weatherIcon.src = "./images/rain.png";
          break;
        case "Drizzle":
          weatherIcon.src = "./images/drizzle.png";
          break;
        case "Mist":
        case "Fog":
        case "Haze":
          weatherIcon.src = "./images/mist.png";
          break;
        case "Snow":
          weatherIcon.src = "./images/snow.png";
          break;
        default:
          weatherIcon.src = "./images/clear.png";
      }

      // Force image reload by adding timestamp
      weatherIcon.src = weatherIcon.src + "?t=" + new Date().getTime();

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim()) {
    checkWeather(searchBox.value);
  }
});

searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && searchBox.value.trim()) {
    event.preventDefault();
    checkWeather(searchBox.value);
  }
});
