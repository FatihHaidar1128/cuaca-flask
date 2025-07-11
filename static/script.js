async function fetchWeather() {
  const weatherDiv = document.getElementById("weather");
  try {
    const response = await fetch("/cuaca");
    const data = await response.json();

    if (!data.observations || data.observations.length === 0) {
      weatherDiv.innerHTML = "<p>Data belum tersedia.</p>";
      return;
    }

    const obs = data.observations[0];

    weatherDiv.innerHTML = `
      <p><strong>Stasiun:</strong> ${obs.stationID}</p>
      <p><strong>Suhu:</strong> ${obs.metric.temp} °C</p>
      <p><strong>Kelembapan:</strong> ${obs.humidity}%</p>
      <p><strong>Tekanan:</strong> ${obs.metric.pressure} hPa</p>
      <p><strong>Angin:</strong> ${obs.metric.windSpeed} km/jam</p>
      <p><em>Diperbarui: ${obs.obsTimeLocal}</em></p>
    `;
  } catch (err) {
    weatherDiv.innerHTML = "<p>Gagal memuat data.</p>";
    console.error(err);
  }
}

fetchWeather();
