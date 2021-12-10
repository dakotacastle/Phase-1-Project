
const weather = {
    apiKey: "4cd6d52c9d7fffcfa793f2c851a64410",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    
    displayWeather: function (data) {
      const {name} = data;
      const {icon, description} = data.weather[0];
      const {temp, humidity} = data.main;
      const {speed} = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°F";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };

function convertFToC (fahrenheit) {
    const fTemp = fahrenheit;
    const fToCel = (fTemp - 32) * 5 / 9;
    return fToCel;
}
function convertCToF (celsius) {
    const cTemp = celsius;
    const cToFahr = cTemp * 9 / 5 + 32;
    return cToFahr;
}
let toggle = true;
function toggleClick() {
    if(toggle) {
        console.log(temp)
        toggle = !toggle;
        convertFToC(temp)
    } else{
        toggle = !toggle;
        convertCToF(temp)
    }
};
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
   document.querySelector(".toggle").addEventListener("click", toggleClick)

   
  
  weather.fetchWeather("Columbia");