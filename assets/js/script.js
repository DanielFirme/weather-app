//ATALHOS
const $ = document.querySelector.bind(document);
$('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();
    const input = $('#searchInput').value;
    if(input !== ''){
        clearInfo();
        showWarming('Carregando...');
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
            clearInfo();
            showWarming('Cidade não encontrada.');
        }
    } else {
        clearInfo();
    }
});

function showInfo(json){
    showWarming('');
    $('.titulo').innerHTML = json.name + ', ' + json.sys.country;
    $('.tempInfo').innerHTML = `${json.main.temp} <sup>ºC</sup>`;
    $('.ventoInfo').innerHTML = `${json.wind.speed} <span>km/h</span>`;
    $('.ventoPonto').style.transform = `rotate(${json.wind.deg - 90}deg)`;
    $('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);
    $('.resultado').style.display = 'block';
}

function clearInfo(){
    showWarming('');
    $('.resultado').style.display = 'none';
}

function showWarming(msg){
    $('.aviso').innerHTML = msg;
}