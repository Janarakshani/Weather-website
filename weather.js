const apikey = "854a502383246be564e969d1ac6a5f14";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  try {
    const resp = await fetch(url(city));
    const respData = await resp.json();

    if (respData.cod === 200) {
      addWeatherToPage(respData);
    } else {
      main.innerHTML = `<p style="color:red;">City not found. Please try again.</p>`;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    main.innerHTML = `<p style="color:red;">Error fetching weather data.</p>`;
  }
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      ${temp}°C
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    </h2>
    <small>${data.weather[0].main}</small>
    <div class="more-info">
      <p>Humidity: <span>${humidity}%</span></p>
      <p>Wind Speed: <span>${Math.trunc(windSpeed * 3.6)} km/h</span></p>
    </div>
  `;

  main.innerHTML = ""; // Clear previous weather
  main.appendChild(weather);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value.trim();

  if (city) {
    getWeatherByLocation(city);
  }
});
