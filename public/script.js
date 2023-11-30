const weatherApi = "/weather";
const weatherForm = $("form");
const search = $("input");
const weatherIcon = $(".weatherIcon i");
const weatherCondition = $(".weatherCondition");
const tempElement = $(".temperature span");
const locationElement = $(".place");
const dataElement = $(".date");

dataElement.text(
  new Date().toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
  })
);

weatherForm.submit((e) => {
  e.preventDefault();
  locationElement.text("Loading...");
  weatherIcon.removeClass();
  tempElement.text("");
  weatherCondition.text("");

  const city = search.val();
  if (city) {
    getWeatherData(city);
  } else {
    locationElement.text("Please enter a city.");
  }
});

const getWeatherData = async (city) => {
  try {
    const response = await fetch(`${weatherApi}?address=${city}`);
    const result = await response.json();

    if (result.cod === 200) {
      const weatherDescription = result.weather[0].description.toLowerCase();

      if (weatherDescription === "rain" || weatherDescription === "fog") {
        weatherIcon.addClass("wi wi-day-" + weatherDescription);
      } else {
        weatherIcon.addClass("wi wi-day-cloudy");
      }

      locationElement.text(result.name);
      tempElement.text(result.main.temp);
      weatherCondition.text(weatherDescription.toUpperCase());
    } else {
      locationElement.text("City not found.");
    }
  } catch (error) {
    locationElement.text("Error fetching data");
  }
};

// По умолчанию отображаем погоду для "Baku"
getWeatherData("Baku");
