

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

async function main(withIP = true) {
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


 // const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid={41386ebcf05aed7668ba7df59987760f&lang=fr&units=metric}')
// const meteo = await fetch('https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={f93919bd5d8150c4e236cdb6d6d34f51}')

 const meteo = await fetch('https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=f93919bd5d8150c4e236cdb6d6d34f51&lang=fr&units=metric')
        .then(resultat => resultat.json())
        .then(json => json)

    console.log(meteo);
    displayWeatherInfos(meteo)

}

function displayWeatherInfos(data) {
    const name = data.name;
    const temperatureMax = data.main.temp_max;
    const temperature = data.main.temp;
    const pressure = data.main.pressure;

    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    const humidity = data.main.humidity + " % Humiditée";
    const wind = data.wind.speed +' km/h';

    document.querySelector('#ville').innerHTML = name;
    document.querySelector('#temperature').innerHTML = Math.round(temperature);
    document.querySelector('#temperatureMax').innerHTML = temperatureMax + " Temp Max";
     document.querySelector('#pressure').innerHTML = pressure + " Pression";
    document.querySelector('#conditions').innerHTML = capitalize(description);

    document.querySelector('#humidity').innerHTML = humidity;
    document.querySelector('#wind').innerHTML =
    "<i class='fas fa-wind'></i>" + data.wind.speed + 'km/h';

    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();



}

ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;

});

ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = false;

        main(false);
    }
});


 main();

