// Show notification
function showNotification(message) {
    // Check if the browser supports notifications
    if ('Notification' in window && Notification.permission === 'granted') {
      // Create a new notification
      new Notification(message);
    }
  }
  
  function searchWeather() {
    var location = document.getElementById("locationInput").value;
    var apiKey = "4a2a1ce1043f9a94ac1a76a3b2c3f599"; // Replace with your actual API key
  
    // Make an API request to fetch the weather data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        // Process the weather data and display it
        displayWeather(data);
        showNotification('Weather details for 7 days');
      })
      .catch(error => {
        console.log("Error fetching weather data:", error);
      });
  }
  
  function displayWeather(weatherData) {
    var detailsContainer = document.getElementById("weatherDetails");
    detailsContainer.innerHTML = "";
  
    var locationElement = document.createElement("h2");
    locationElement.innerText = weatherData.city.name;
    detailsContainer.appendChild(locationElement);
  
    var forecastList = weatherData.list;
    var forecastContainer = document.createElement("div");
    forecastContainer.classList.add("forecast-container");
  
    for (var i = 0; i < forecastList.length; i += 8) {
      var forecast = forecastList[i];
  
      var date = new Date(forecast.dt_txt);
      var day = date.toLocaleDateString("en-US", { weekday: "long" });
  
      var forecastElement = document.createElement("div");
      forecastElement.classList.add("forecast-item");
      forecastElement.innerHTML = `
        <h3>${date.toLocaleDateString("en-US")} - ${day}</h3>
        <p>Temperature: ${forecast.main.temp}°C</p>
        <p>Description: ${forecast.weather[0].description}</p>
      `;
      forecastContainer.appendChild(forecastElement);
    }
  // Check if the forecast date is within the next 24 hours
  var forecastDate = date;
  var currentDate = new Date();
  var twentyFourHoursLater = new Date();
  twentyFourHoursLater.setDate(currentDate.getDate() + 1);   
  
    detailsContainer.appendChild(forecastContainer);
  }
  