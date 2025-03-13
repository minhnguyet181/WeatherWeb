const API_KEY = "4b95afeabdd85fed3076b3989ef14cf4"; 

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const {
    coord: { lat, lon },
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
  const forecastData = await fetch(forecastURL)
    .then((res) => res.json())
    .then((data) => data);

  const dailyForecast = forecastData.list.filter((_, index) => index % 8 === 0).map((day) => ({
    date: new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" }),
    temp: day.main.temp,
    iconURL: makeIconURL(day.weather[0].icon),
  }));
  const { description, icon } = weather[0];
  // const hourlyURL = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;
  // const hourlyData = await fetch(hourlyURL).then((res) => res.json()).then((data) => data);
  // const hourlyForecast = hourlyData.hourly.filter((h) => 
  //   new Date(h.dt * 1000).getHours() % 3 === 0
  // )
  // .slice(0, 8) 
  // .map((h) => ({
  //   time: new Date(h.dt * 1000).toLocaleTimeString("en-US", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   }),
  //   temp: h.temp,
  //   iconURL: makeIconURL(h.weather[0].icon),
  // }));

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
    dailyForecast,
    // hourlyForecast
  };
};

export { getFormattedWeatherData };
