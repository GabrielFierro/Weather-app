// Zona de declaracion e inicializacion de variables
const apiKey = 'b597ba1ffe87537c9437ccae11048e59';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input'); // get the input data
const searchBtn = document.querySelector('.search button'); // get the button data
const weatherIcon = document.querySelector('.weather-icon'); // get the icon from the weather
const conditionTitle = document.querySelector('.date h1'); // get the title of the left side
const descriptionTitle = document.querySelector('.date p'); // get the descrption of the left side
const date = document.querySelector('display_date'); // get the div who display the date description
const background = document.querySelector('.background'); // get background class who represent the bg image
const card = document.querySelector('.card'); // get card

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value); // pass the value from the search box which represents the city
});

async function checkWeather(city) {
  // The parameter represents the city who is looking for the user

  // Reading the data from the api with promises
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // If city name invalid display a message error
  if (response.status == 404) {
    document.querySelector('.display_date').style.display = 'none';
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    var data = await response.json();
    // Data zone
    const cityName = data.name;
    const temp = Math.round(data.main.temp) + '°c';
    const humidity = data.main.humidity + '%';
    const wind = data.wind.speed + ' km/h';
    const condition = data.weather[0].main;
    const description = data.weather[0].description;

    //console.log(data);

    // Display the data
    document.querySelector('.city').innerHTML = cityName;
    document.querySelector('.temp').innerHTML = temp;
    document.querySelector('.humidity').innerHTML = humidity;
    document.querySelector('.wind').innerHTML = wind;
    descriptionTitle.innerHTML = description;

    // Add a conditional statement to control the weather icon with the weather data
    switch (condition) {
      case 'Clouds':
        weatherIcon.src = 'icons/clouds.svg';
        conditionTitle.innerHTML = 'Cloudy';
        card.style.backgroundImage = 'url(images/cloud.webp)';
        background.style.backgroundImage = 'url(images/cloud.webp)';
        break;
      case 'Clear':
        weatherIcon.src = 'icons/sun.svg';
        conditionTitle.innerHTML = 'Clearly';
        card.style.backgroundImage = 'url(images/sun.webp)';
        background.style.backgroundImage = 'url(images/sun.webp)';
        break;
      case 'Rain':
        weatherIcon.src = 'icons/rain.svg';
        conditionTitle.innerHTML = 'Rainy';
        card.style.backgroundImage = 'url(images/rain.webp)';
        background.style.backgroundImage = 'url(images/rain.webp)';
        break;
      case 'Drizzle':
        weatherIcon.src = 'icons/drizzle.svg';
        conditionTitle.innerHTML = 'Drizzle';
        card.style.backgroundImage = 'url(images/rain_mid3.webp)';
        background.style.backgroundImage = 'url(images/rain_mid3.webp)';
        break;
      case 'Mist':
        weatherIcon.src = 'icons/mist.svg';
        conditionTitle.innerHTML = 'Misty';
        card.style.backgroundImage = 'url(images/misty.webp)';
        background.style.backgroundImage = 'url(images/misty.webp)';
      case 'Snow':
        weatherIcon.src = 'icons/snowflake.svg';
        conditionTitle.innerHTML = 'Snow';
        card.style.backgroundImage = 'url(images/snow.webp)';
        background.style.backgroundImage = 'url(images/snow.webp)';
      default:
        weatherIcon.src = 'icons/sun.svg';
        conditionTitle.innerHTML = 'Clearly';
        card.style.backgroundImage = 'url(images/sun.webp)';
        background.style.backgroundImage = 'url(images/sun.webp)';
        break;
    }
    // Add transitions for the background images, the weather icon and the title
    weatherIcon.transition = 'all 2s';
    conditionTitle.transition = 'all 1s';
    card.style.transition = 'all 2s';
    background.style.transition = 'all 1s';

    document.querySelector('.display_date').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
    document.querySelector('.weather').style.display = 'block';
  }
}
