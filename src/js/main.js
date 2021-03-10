const cityForm = document.querySelector('.search-location');
const card = document.querySelector('.card');
const cardDetails = document.querySelector('.card__details');
const time = document.querySelector('.card__time');
const icon = document.querySelector('.card__icon img');
const forecast = new Forecast();

const updateUI = data => {
  const {cityDetails, weather} = data;

  cardDetails.innerHTML = `
    <h2 class="my-3">${cityDetails.EnglishName}</h2>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="pb-4 card__temperature">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
  `;

  const iconSrc = `dist/assets/img/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = weather.IsDayTime ? 'dist/assets/img/day.svg': 'dist/assets/img/night.svg';

  time.setAttribute('src', timeSrc);

  if(card.classList.contains('d-none')) {
    card.classList.remove('d-none')
  }
};

cityForm.addEventListener('submit', event => {
  event.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  localStorage.setItem('city', city)
});

if (localStorage.getItem('city')) {
  forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
