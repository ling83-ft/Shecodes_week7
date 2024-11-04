function changeDetails(response) {
  let tempElement = document.querySelector("#weather-app-temperature");
  let temp = Math.round(response.data.temperature.current);
  tempElement.innerHTML = temp;
  let condition = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let currentDateELement = document.querySelector("#weather-app-details");
  let originalstring = currentDateELement.innerHTML;
  let newString = originalstring.replace("clear sky", `${condition}`);
  newString = newString.replace("47", `${humidity}`);
  newString = newString.replace("2.57", `${wind}`);
  currentDateELement.innerHTML = newString;
  let tempIcon = document.querySelector("#weather-app-icon");
  tempIcon.innerHTML = "";
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  formatDate(new Date());
  //call api and search city
  let apiKey = "4a38ba6a1f4e46ao3f0t9673657bc0fc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}`;
  axios.get(apiUrl).then(changeDetails);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDateELement = document.querySelector("#weather-app-details");

  let originalstring = currentDateELement.innerHTML;
  let formattedDay = days[day];
  let newString = originalstring.replace(
    "Monday 12:43",
    `${formattedDay} ${hours}:${minutes}`
  );
  currentDateELement.innerHTML = newString;
}

formatDate(new Date());

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);
