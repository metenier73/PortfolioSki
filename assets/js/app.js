

const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "  wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}
var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var press = document.querySelector('.press');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');

var wind = document.querySelector('.wind');

var humidity = document.querySelector('.humidity');


button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=f93919bd5d8150c4e236cdb6d6d34f51&lang=fr&units=metric')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];
  var pressValue = data['main']['pressure'];
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];
  var conditions = data.weather[0].main;
  var conditions = document.querySelector('i.wi').className = weatherIcons[conditions];

  press.innerHTML = pressValue + " Pression";;
  main.innerHTML = nameValue;
  desc.innerHTML =  " Description -" +descValue ;
  temp.innerHTML = tempValue + "- Température ";

  var humidityValue = data['main']['humidity'];
  var windValue = data['wind']['speed'] ;

  wind.innerHTML =  windValue +' km/h';
  humidity.innerHTML = humidityValue + " % Humiditée";

  input.value ="";

})

.catch(err => alert("Wrong city name!"));
})
