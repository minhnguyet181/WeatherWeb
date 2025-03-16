const API_KEY = "4b95afeabdd85fed3076b3989ef14cf4"; 

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather/?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json());

  const {
    coord: { lat, lon },
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    sys: { country },
    name,
    dt,
  } = data;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
  const forecastData = await fetch(forecastURL)
    .then((res) => res.json());

  const dailyForecast = forecastData.list.filter((_, index) => index % 8 === 0).map((day) => ({
    date: new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" }),
    temp: day.main.temp,
    iconURL: makeIconURL(day.weather[0].icon),
  }));
  const { description, icon } = weather[0];
  const currentDate = new Date(dt * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    speed,
    country,
    name,
    dailyForecast,
    currentDate,
  };
};

export { getFormattedWeatherData };
