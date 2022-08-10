//dom for container elements
const locationNameEL = document.querySelector(".locationName");
const form = document.querySelector("form");
const inputLocation = document.getElementById("inputLocation");
const mainContainer = document.querySelector(".mainContainer");
mainContainer.classList.add("invisible");
const button = document.getElementById("submitButton");
const descriptionEl = document.querySelector(".description");
const tempEl = document.querySelector(".temp");
const feelsLikeEl = document.querySelector(".feelsLike");
const humidityEl = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");
const toggleSwitch = document.querySelector(".toggleContainer");
const celciusButton = document.getElementById("celsiusButton");
const farenheitButton = document.getElementById("farenheitButton");

let myData;
button.addEventListener("click", getURL);

function getURL() {
  let URL =
    `https://api.openweathermap.org/data/2.5/weather?q=` +
    inputLocation.value +
    `&APPID=6d7b120da19e1522ae301864dd00ae4e`;
  getData(URL);
};

//retrieves data, proccesses, displays
async function getData(URL) {
  const response = await fetch(URL, { mode: "cors" });
  if (response.status === 400) {
    alert("ERROR - Please enter valid location.");
  } else if (response.status === 404) {
    alert("ERROR - City not found.");
  } else {
    const weatherData = await response.json();
    const myData = processData(weatherData);
    displayData(myData);
    celciusButton.addEventListener("click", displayCelsius);
    farenheitButton.addEventListener("click", displayFarenheit);
    form.reset();
    return myData;
  }
};

//converts data into weather data object for display
function processData(weatherData) {
  myData = {
    currentTemp: {
      f: convertToF(weatherData.main.temp),
      c: convertToC(weatherData.main.temp),
    },
    feelsLike: {
      f: convertToF(weatherData.main.feels_like),
      c: convertToC(weatherData.main.feels_like),
    },
    humidity: weatherData.main.humidity,
    description: weatherData.weather[0].description,
    windSpeed: weatherData.wind.speed,
  };
  return myData;
};

//converts kelvin to F
function convertToF(temp) {
  let farenheit = Math.round(1.8 * (temp - 273) + 32);
  return farenheit;
};

//converts form F to C
function convertToC(tempK) {
  let celcius = Math.round(tempK - 273.15);
  return celcius;
};

//display in C
function displayCelsius() {
  tempEl.innerHTML = `Temp: ${myData.currentTemp.c} °C`;
  feelsLikeEl.innerHTML = `Feels like: ${myData.feelsLike.c} °C`;
};

//display in f
function displayFarenheit() {
  tempEl.innerHTML = `Temp: ${myData.currentTemp.f} °F`;
  feelsLikeEl.innerHTML = `Feels like: ${myData.feelsLike.f} °F`;
};

//displays weather data
function displayData(myData) {
  toggleSwitch.style.display = "inherit";
  mainContainer.style.display = "grid";
  locationNameEL.innerHTML = capetalize(inputLocation.value);
  tempEl.innerHTML = `Temp: ${myData.currentTemp.f} °F`;
  feelsLikeEl.innerHTML = `Feels like: ${myData.feelsLike.f} °F`;
  humidityEl.innerHTML = `Humidity: ${myData.humidity} %`;
  descriptionEl.innerHTML = capetalize(myData.description);
  windSpeed.innerHTML = `Wind Speed: ${myData.windSpeed} mph`;

  if (
    descriptionEl.innerHTML === "Broken clouds" ||
    descriptionEl.innerHTML === "Few clouds" ||
    descriptionEl.innerHTML === "Scattered clouds"
  ) {
    document.body.style.backgroundImage = "URL(assets/clouds.jpeg)";
  } else if (descriptionEl.innerHTML === "Clear sky") {
    document.body.style.backgroundImage = "URL(assets/clearSky.webp)";
  } else if (descriptionEl.innerHTML === "Mist") {
    document.body.style.backgroundImage = "URL(assets/mist.jpeg)";
  } else if (descriptionEl.innerHTML === "Overcast clouds") {
    document.body.style.backgroundImage = "URL(assets/overcast.jpeg)";
  } else if (descriptionEl.innerHTML === "Heavy intensity rain") {
    document.body.style.backgroundImage = "URL(assets/heavyRain.jpeg)";
  } else if (descriptionEl.innerHTML === "Thunderstorm") {
    document.body.style.backgroundImage = "URL(assets/thunderstorm.jpeg)";
  }
};

//function to capetalize letters of strings
function capetalize(string) {
  let capetalizedString = string.charAt(0).toUpperCase() + string.slice(1);
  return capetalizedString;
};
