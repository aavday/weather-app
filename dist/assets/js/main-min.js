const cityForm=document.querySelector(".search-location"),card=document.querySelector(".card"),cardDetails=document.querySelector(".card__details"),time=document.querySelector(".card__time"),icon=document.querySelector(".card__icon img"),forecast=new Forecast,updateUI=e=>{const{cityDetails:t,weather:c}=e;cardDetails.innerHTML=`\n    <h2 class="my-3">${t.EnglishName}</h2>\n    <div class="my-3">${c.WeatherText}</div>\n    <div class="pb-4 card__temperature">\n        <span>${c.Temperature.Metric.Value}</span>\n        <span>&deg;C</span>\n    </div>\n  `;const a=`dist/assets/img/${c.WeatherIcon}.svg`;icon.setAttribute("src",a);let s=c.IsDayTime?"dist/assets/img/day.svg":"dist/assets/img/night.svg";time.setAttribute("src",s),card.classList.contains("d-none")&&card.classList.remove("d-none")};cityForm.addEventListener("submit",e=>{e.preventDefault();const t=cityForm.city.value.trim();cityForm.reset(),forecast.updateCity(t).then(e=>updateUI(e)).catch(e=>console.log(e)),localStorage.setItem("city",t)}),localStorage.getItem("city")&&forecast.updateCity(localStorage.getItem("city")).then(e=>updateUI(e)).catch(e=>console.log(e));