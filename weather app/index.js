document.addEventListener("DOMContentLoaded",() => {
    const weatherform = document.querySelector('.weatherform');
    const city = document.querySelector('.cityinput');
    const output = document.querySelector('.card');

    const APIKEY = "769eb484cc8fc083291aa152afbf63ab";

    weatherform.addEventListener("submit", async event => {
        event.preventDefault();
        clearscr();
        const cityname = city.value;
        if(cityname){
            try{
                const weatherdata = await getweatherdata(cityname);
                displayweather(weatherdata);
            }
            catch(err){
                error(err);
            }
        }
        else{
            error("Please enter a City Name");
        }
    });

    async function getweatherdata(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Couldn't fetch City weather data");
        }
        const data = await response.json();
        return data;
    }

    function displayweather(data){
        output.style.display = 'flex';

        const place = document.createElement('h1');
        const temp = document.createElement('p');
        const humidity = document.createElement('p');
        const desc = document.createElement('p');
        const emoji = document.createElement('p');

        place.textContent = data.name;
        temp.textContent = `${Math.round(data.main.temp-273.15)}\u00B0C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        desc.textContent = `Status: ${data.weather[0].description}`;
        emoji.textContent = emojidisplay(data.weather[0].id);

        place.classList.add("h1");
        temp.classList.add('p');
        humidity.classList.add('p');
        desc.classList.add('p');
        emoji.classList.add('emoji');

        output.appendChild(place);
        output.appendChild(temp);
        output.appendChild(humidity);
        output.appendChild(desc);
        output.appendChild(emoji);

    }

    function emojidisplay(id){
        let emoji = ""

        if(id>=200 && id<300){
            emoji = "⛈️"
        }
        else if(id>=300 && id<400){
            emoji = "☔"
        }
        else if(id>=500 && id<600){
            emoji = "🌧️"
        }
        else if(id>=600 && id<700){
            emoji = '😶‍🌫️'
        }
        else if(id>=700 && id<800){
            emoji = '❄️'
        }
        else if (id===800){
            emoji = '☀️'
        }
        else{
            emoji = '☁️'
        }

        return emoji;
    }

    function error(message){
        window.alert(message);
    }

    function clearscr(){
        output.style.display = 'none';
        output.innerHTML = '';
    }
});