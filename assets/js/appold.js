

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

 /* async function main(withIP = true) {
    let ville;

    if(withIP){

        const ip = await fetch('https://api.ipify.org?format=json')
            .then(resultat => resultat.json())
            .then(json => json.ip);

      ville = await fetch('http:/freegeoip.net/json/' + ip)
            .then(resultat => resultat.json())
            .then(json => json.city);

    } else {
        ville = document.querySelector('#ville').textContent;

    }
*/

 // const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid={41386ebcf05aed7668ba7df59987760f&lang=fr&units=metric}')
// const meteo = await fetch('https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={f93919bd5d8150c4e236cdb6d6d34f51}')

     name = data.name;
     temperatureMax = data.main.temp_max;
     temperature = data.main.temp;
     pressure = data.main.pressure;

     conditions = data.weather[0].main;
     description = data.weather[0].description;
     humidite = data.main.humidity + " % Humiditée";
     wind = data.wind.speed +' km/h';

let apiCall = function (city) {

 let url = await fetch('https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=f93919bd5d8150c4e236cdb6d6d34f51&lang=fr&units=metric');
    fetch(url)
        .then((response) =>
            response.json().then((data) => {
                console.log(data);
                document.querySelector('#ville').innerHTML = data.name;
                    document.querySelector('#temperature').innerHTML =
                     "<i class='fas fa-thermometer-half'></i>" data.main.temp Math.round(temperature);


                document.querySelector('#ville').innerHTML = name;
                document.querySelector('#temperature').innerHTML =
                "<i class='fas fa-thermometer-half'></i>" Math.round(temperature);
                document.querySelector('#temperatureMax').innerHTML = temperatureMax + " Temp Max";
                 document.querySelector('#pressure').innerHTML = pressure + " Pression";
                document.querySelector('#conditions').innerHTML = capitalize(description);

                document.querySelector('#humidite').innerHTML = humidite;
                document.querySelector('#wind').innerHTML =
                "<i class='fas fa-wind'></i>" + data.wind.speed + 'km/h';

                document.querySelector('i.wi').className = weatherIcons[conditions];

                document.body.className = conditions.toLowerCase();

              })
        )



}


 ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;

});

ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = true;

        main(false);
    }
});


 main();

