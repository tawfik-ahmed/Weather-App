'use strice'
const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "ad2a30009d584af83921b74585bd1ab5";

weatherForm.addEventListener("submit", async e => {
    e.preventDefault();

    const city = cityInput.value;
    if (city) {
        try {

            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {

            console.error(error);
            displayError(error)
        }
    }
    else displayError("Please Enter a City");
    cityInput.value = '';

});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Could Not Featch Weather Data");

    return await response.json();
}

function displayWeatherInfo(data) {

    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.className = "cityDisplay";
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempDisplay.className = "tempDisplay";
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.className = "humidityDisplay";
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description;
    descDisplay.className = "descriptionDisplay";
    card.appendChild(descDisplay);

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.className = "weatherEmoji";
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case weatherId >= 200 && weatherId < 600: return "⛈️";
        case weatherId >= 600 && weatherId < 800: return "❄️";
        case weatherId >= 700 && weatherId < 800: return "❄️";
        case weatherId === 800: return "☀️";
        case weatherId >= 801 && weatherId < 810: return "☁️";
        default: return "❓";
    }
}

function displayError(msg) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = msg;
    errorDisplay.className = "errorDisplay";

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}