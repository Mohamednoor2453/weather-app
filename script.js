document.addEventListener("DOMContentLoaded", function () {
    const weatherForm = document.querySelector("#weatherForm");
    const input = document.querySelector("#input");
    const weatherDetails = document.querySelector("#weatherdetails");

    weatherForm.addEventListener("submit", function (e) {
        e.preventDefault();
        displayWeatherInfo();
    });

    function displayWeatherInfo() {
        const cityName = input.value.trim().toLowerCase();

        if (cityName === "") {
            alert("Enter a city, please.");
        } else {
            fetchData(cityName);
        }
    }
    function fetchData(cityName) {
      fetch("weather.json")
          .then(response => {
              console.log("Response:", response);
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              console.log("Fetched data:", data);
              displayDetails(data, cityName);
          })
          .catch(error => {
              console.error("Error fetching data:", error);
              throw new Error(`Error fetching data: ${error.message}`);
          });
  }
  

    function displayDetails(data, cityName) {
        const cityData = data[cityName];

        if (cityData) {
            // Clear previous details
            weatherDetails.innerHTML = "";

            // Assuming each city has an array of weather details
            const weatherDetailsHTML = cityData.map(details => {
                return `<li>Temperature: ${details.temperature}, Humidity: ${details.humidity}</li>`;
            }).join("");

            weatherDetails.innerHTML = weatherDetailsHTML;
        } else {
            alert(`Weather details not available for ${cityName}`);
        }
    }
});