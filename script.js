let appId='47a274fd24c62baf8706115521fc93f5';
let units='imperial';
let searchMethod;
function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMethod='zip';
    }else{
        searchMethod='q';
    }
}
 function searchWeather(searchTerm){
     getSearchMethod(searchTerm);
     fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
     }).then(result => {
         init(result);
     })
 }
 function init(resultFromServer){
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            console.log('hello5');
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;

        case 'Rain':
        case'Drizzle':
        case 'Mist':
            console.log('hello5');
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;

        case 'Clouds':
            console.log('hello5');
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;

        case 'Thunderstorm' : 
            console.log('hello5');
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;

        case 'Snow':
            console.log('hello5');
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;

        default:
            document.body.style.backgroundImage = 'url("default.jpg")';
            break;
    }

    let weatherDescriptionHeader=document.getElementById('weatherDescriptionHeader');
    let temperatureElement=document.getElementById('temperature');
    let humidityElement=document.getElementById('humidity');
    let cityHeader=document.getElementById('cityHeader');
    let windSpeed=document.getElementById('windSpeed');
    let weatherIcon=document.getElementById('documentIconImg');

    weatherIcon.src=' http://openweathermap.org/img/wn/'+resultFromServer.weather[0].icon+'@2x.png';
    
    let resultDescription=resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText=resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    
    temperatureElement.innerHTML=Math.floor(resultFromServer.main.temp) + '&#176';
    
    windSpeed.innerHTML = 'Winds at '+ Math.floor(resultFromServer.wind.speed)+' m/s';
    
    humidityElement.innerHTML='Humidity levels at ' + resultFromServer.main.humidity + '%';
    
    cityHeader.innerHTML=resultFromServer.name;

    setPositionForWeatherInfo();
 }

function setPositionForWeatherInfo(){
    let weatherContainer=document.getElementById('weatherContainer');
    let weatherContainerHeight= weatherContainer.clientHeight;
    let weatherContainerWidth= weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.6}px)`;
    weatherContainer.style.visibility = 'visible';
}

 document.getElementById('searchBtn').addEventListener('click',() => {
     let searchTerm=document.getElementById('searchInput').value;
     if(searchTerm)
        searchWeather(searchTerm);
 })