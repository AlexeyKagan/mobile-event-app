export const getDateByParam = selectedDate => {

  if (!selectedDate) {
    return new Date();
  }

  return new Date(...selectedDate.split('.'));
};

export const currentTasks = data => data.tasks.filter(t => new Date(t.dateAt).toString() === getDateByParam().toString());

const APPID = "6b19232ef146adecb4a1f928c4c9812a";
const getWeatherUrl = (lat, lon) => "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APPID;

export const fetchWeather = ($http, lat, lon) => $http.get(getWeatherUrl(lat, lon));

export const getWeather = ($http) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      resolve({ lat, lon })
    }, error => reject(console.log(`code:${error.code} message: ${error.message}`)),
    { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 });
  })
  .then(({ lat, lon }) => fetchWeather($http, lat, lon))
  .catch(console.error)
};

/**

 const icon = res.data.weather[0].icon;
 const temp = Math.round(res.data.main.temp - 275) + " °C";
 const img = document.querySelector("#img-weather");

 angular.element(img).attr("src", "http://openweathermap.org/img/w/" + icon + '.png');

 this.update({ temp });
 */