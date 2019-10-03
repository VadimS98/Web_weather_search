import './style.scss'

let APIkey = 'e787dd4d8c91f11c6945bb9985a6473e';
let weather;

document.getElementById('submit').onclick = processInp;

function processInp() {
    let cityName = document.getElementById('searchInp').value;
    getWeather(cityName);
}

function fillElements(picSrc, error, place, weather, temperature, wind) {
    document.getElementById('picID').src = picSrc;
    document.getElementById('errorID').innerText = error;
    document.getElementById('placeID').innerText = place;
    document.getElementById('weatherID').innerText = weather;
    document.getElementById('temperature').innerText = temperature;
    document.getElementById('wind').innerText = wind;
}

function getWeather(cityName) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        dataType: 'json',
        data: {
            q: cityName,
            appid: APIkey
        }
    })
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
        )
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
