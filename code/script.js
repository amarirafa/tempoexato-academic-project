const apiKey = ""; // Insira sua chave api aqui
const searchCity = document.querySelector('#city');
const searchBtn = document.querySelector('#btn');
const resWeather = document.querySelector('.weather-result');

// Eventos para a barra de pesquisa e botão
searchBtn.addEventListener('click', fetchWeather);
searchCity.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        fetchWeather()
    }
});

// Imagens dinamicas
function uploadImage() {
    const time = new Date();
    const hours = time.getHours();
    const img = document.querySelector('#image');

    if (hours >= 0 && hours < 12) {
        img.src = './images/day-150.jpg'
        document.body.style.background = '#035d04'
        searchBtn.style.background = '#035d04'
    } else if (hours >= 12 && hours <= 18) {
        img.src = './images/afternoon-150.jpg'
        document.body.style.background = '#933015'
        searchBtn.style.background = '#933015'
    } else {
        img.src = './images/night-150.jpg'
        document.body.style.background = '#3c595d'
        searchBtn.style.background = '#3c595d'
    }
};

// Função para buscar o clima
function fetchWeather() {
    const city = searchCity.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada');
            }
            return response.json();
        })

        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const icon = data.weather[0].icon;
            resWeather.innerHTML = `
                <h1>Previsão para ${data.name} Hoje!</h1>
                <p><strong>Temperatura:</strong> ${temperature}°C</p>
                <p><strong>Condições:</strong> ${weatherDescription}</p>
                <img id='icon' src="http://openweathermap.org/img/wn/${icon}.png" alt="Icone do clima">
            `;
        })

        .catch(error => {
            resWeather.innerHTML = `<h1>${error.message}</h1>`;
        })
};