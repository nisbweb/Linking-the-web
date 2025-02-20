async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '6def4c4a917a9d1298f345c3ff7454b3';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
  
    const result = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;
    document.getElementById('weatherResult').innerHTML = result;
  }
  