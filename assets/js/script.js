//ATALHOS
const $ = document.querySelector.bind(document);

let input = 'Goiânia';
const backgroundWAPP = $('.weather-app');

$('.search').addEventListener('submit', (event)=>{
    event.preventDefault();
    const input = $('#searchInput').value;
    if(input !== ''){
        $('button .zoom--btn').classList.add('hideIcon');
        $('button .loading--icon').classList.remove('hideIcon');
        showWarming('Carregando...');
        backgroundWAPP.style.opacity = "0";
        searchWeather(input);
    } else {
        clearInfo();
    }
});

window.addEventListener('mousemove', (event)=>{
    if(event.pageY >= 100){
        $('header').classList.add('hide');
    } else {
        $('header').classList.remove('hide');
    }
})

function showInfo(json){
    showWarming('');
    $('.city h2').innerText = json.name + ', ' + json.sys.country;
    const date = new Date();
    const miliseconds = date.getMilliseconds();
    const utcMiliseconds = miliseconds + (date.getTimezoneOffset() * 60000);
    
    date.setMilliseconds(utcMiliseconds + (json.timezone * 1000));
    
    let weekDay = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date);
    
    $('.datetime time').innerText = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;

    $('.day--date .weekday').innerText = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
    $('.day--date .date').innerText = new Intl.DateTimeFormat().format(date);
    
    $('.current-temp span').innerText = `${json.main.temp}`;
    $('.var-temp .max-temp-deg').innerText = `${json.main['temp_max']}`;
    $('.var-temp .min-temp-deg').innerText = `${json.main['temp_min']}`;
    $('.weather--image--desc').innerText = `${json.weather[0].description}`;
    $('.feels-like.info-det .fl-deg').innerText = `${json.main['feels_like']}`;
    $('.humidity.info-det .hum-deg').innerText = `${json.main.humidity}`;
    $('.wind.info-det .wind').innerText = `${json.wind.speed}`;
    $('.weather--image img').setAttribute('src', `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);

    setBackgroundImageUrl(json.weather[0].id, json.weather[0].icon.slice(-1));
}

function clearInfo(){
    showWarming('');
}

function showWarming(msg){
    $('#searchInput').value = msg
}

async function searchWeather(input){
    /**
         * A função encodeURI() codifica a URI substituindo 
         * cada instância de certos caracteres por um, dois, 
         * três ou quatro sequências de escape representando 
         * a codificação UTF-8 do caracter 
         * (será somente quatro sequências de escape 
         * para caracteres compostos de dois caracteres 
         * substitutos).
         */
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=6324696c9cabbefd83b6a00e4d825e75&units=metric&lang=pt_br`;

    const results = await fetch(url);
    const json = await results.json();
    console.log(json);
    
    if(json.cod === 200){
        showInfo(json);
    } else {
        backgroundWAPP.style.opacity = "1";
        showWarming('Cidade não encontrada.');
        setTimeout(()=>{
            showWarming('');
        }, 4000);
    }

    if($('button .zoom--btn').classList.contains('hideIcon')){
        $('button .zoom--btn').classList.remove('hideIcon');
        $('button .loading--icon').classList.add('hideIcon');
    } 
}

function setBackgroundImageUrl(weatherId, letterIcon){
    
    const timeOfDay = (letterIcon === 'd') ? 'day' : 'night';

    if (weatherId == 800) {
        backgroundWAPP.style.backgroundImage = `url(assets/images/${timeOfDay}/clear.jpg)`;
    } else if (
        weatherId == 801 ||
        weatherId == 802 ||
        weatherId == 803 ||
        weatherId == 804
    ) {
        backgroundWAPP.style.backgroundImage = `url(assets/images/${timeOfDay}/cloud.jpg)`;
    } else if (
        weatherId == 200 ||
        weatherId == 201 ||
        weatherId == 202 ||
        weatherId == 210 ||
        weatherId == 211 ||
        weatherId == 212 ||
        weatherId == 221 ||
        weatherId == 522 ||
        weatherId == 230 ||
        weatherId == 231 ||
        weatherId == 232 ||
        weatherId == 300 ||
        weatherId == 301 ||
        weatherId == 302 ||
        weatherId == 310 ||
        weatherId == 311 ||
        weatherId == 312 ||
        weatherId == 313 ||
        weatherId == 314 ||
        weatherId == 321 ||
        weatherId == 500 ||
        weatherId == 501 ||
        weatherId == 502 ||
        weatherId == 503 ||
        weatherId == 504 ||
        weatherId == 511 ||
        weatherId == 520 ||
        weatherId == 521 ||
        weatherId == 522 ||
        weatherId == 531
    ) {
        backgroundWAPP.style.backgroundImage = `url(assets/images/${timeOfDay}/rain.jpg)`;
    } else {
        backgroundWAPP.style.backgroundImage = `url(assets/images/${timeOfDay}/snow.jpg)`;
    }

    backgroundWAPP.style.opacity = "1";
    
}

searchWeather(input);