// https://openweathermap.org/current
const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/",
    units: "metric"
  }

const searchBox = document.querySelector('.search-box');
//searchBox.addEventListener("keypress", cityName);
searchBox.addEventListener("keypress", (eventData) => { ( eventData.keyCode == 13 ) ? getCityResults(searchBox.value):"" } );

function getCityResults(cityName){
    const url = `${api.base}weather?q=${cityName}&units=${api.units}&appid=${api.key}`;
    fetch(url)
    .then(response=>{
        return response.json();
    } )
    .then(
        responseJson => {console.log(responseJson);
        if(responseJson.cod == 200){
            displayResults(responseJson);
        }
        
        }
    )
    .catch(error=>{console.error(error.message);});
}

function displayResults(response){
    let city = document.querySelector('.city') ;
    city.innerHTML = `${response.name}, ${response.sys.country}`;

    let date = document.querySelector('.date');
    date.innerHTML = getDate();

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${response.main.temp}\xB0C`;

    let weather = document.querySelector('.weather');
    weather.innerHTML = response.weather[0].description;

    let highLowTemp = document.querySelector('.highLowTemp');
    highLowTemp.innerHTML = `${response.main.temp_min} \xB0C / ${response.main.temp_max}\xB0C`
}

function getDate(){
    let date = new Date();
    let options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        weekday: 'long'
    }
    return date.toLocaleDateString("en-US", options);
}