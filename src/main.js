import './style.scss'

const compiledFunction = require('./template.pug');
const APIkey = 'e787dd4d8c91f11c6945bb9985a6473e';

document.getElementById('formID').addEventListener('submit', processInp);

function processInp(event) {
    event.preventDefault();
    let city = event.target[0].value;
    getWeather(city)
        .done(
            function (data) {
                fillWeather(data);
                addBackgroundColor(data.weather[0].icon[2]);
            }
        )
        .fail(
            function (err) {
                fillError(err)
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
        default:{
            document.getElementById('bodyID').style.backgroundColor = '#ff0000';
            return;
        }
    }
}

function fillWeather(weather) {
    fillElements({
        picSrc: 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png',
        error: "",
        place: weather.name + ', ' + weather.sys.country,
        weather: 'Current weather: ' + weather.weather[0].main + ' ( ' + weather.weather[0].description + ' )',
        temperature: 'Temperature: ' + (weather.main.temp - 273.15).toFixed(0) + '°C',
        wind: 'Wind: ' + weather.wind.speed + 'm/s'
    });
}

function fillError(error) {
    fillElements({
            picSrc: '',
            error: error.status + ' ' + error.statusText + '\r\n' + 'Details: ' + error.responseJSON.message,
            place: '',
            weather: '',
            temperature: '',
            wind: ''
        }
    );
};

