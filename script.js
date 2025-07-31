async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const apiKey = "bb811d7b70e54fe3b0972829253107";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    resultDiv.innerHTML = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <img src="https:${icon}" alt="${condition}" />
      <p><strong>Temperature:</strong> ${tempC} °C</p>
      <p><strong>Condition:</strong> ${condition}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "❌ Could not fetch weather. Please check the city name.";
  }
}
