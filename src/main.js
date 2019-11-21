import './style.scss'

const compiledFunction = require('./template.pug');
let APIkey = 'e787dd4d8c91f11c6945bb9985a6473e';
let weather;

document.getElementById('formID').addEventListener('submit', processInp);

function processInp(event) {
    event.preventDefault();
    let city = event.target[0].value;
    getWeather(city)
        .done(
            function (data) {
                weather = data;
                fillWeather(weather);
                addBackgroundColor(data.weather[0].icon[2]);
            }
        )
        .fail(
            function (err) {
                fillElements('',err.status + ' ' + err.statusText + '\r\n' + 'Details: ' + err.responseJSON.message,'','','','');
            }
        );
}

function fillElements(obj) {
    document.getElementById('graphWeather').innerHTML = compiledFunction({
        error: obj.error,
        picSrc: obj.picSrc,
        place: obj.place,
        weather: obj.weather,
        temperature: obj.temperature,
        wind: obj.wind
    });
}

function getWeather(cityName) {
    return $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        dataType: 'json',
        data: {
            q: cityName,
            appid: APIkey
        }
    })
}

function addBackgroundColor(mode) {
    switch(mode){
        case 'n':{
            document.getElementById('bodyID').style.backgroundColor = '#808080';
            return;
        }
        case 'd':{
            document.getElementById('bodyID').style.backgroundColor = '#FFFACD';
            return;
        }
        default:
            return;
    }
}

function fillWeather(weather) {
    fillElements(
        'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png',
        '',
        weather.name + ', ' + weather.sys.country,
        'Current weather: ' + weather.weather[0].main + ' ( ' + weather.weather[0].description + ' )',
        'Temperature: ' + (weather.main.temp - 273.15).toFixed(0) + '°C',
        'Wind: ' + weather.wind.speed + 'm/s'
    );
}
