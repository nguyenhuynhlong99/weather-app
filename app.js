let $ = document.querySelector.bind(document);

let weather = {
    "apiKey": "85490bfc2444ae15ed12ce0512cdad9f",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {    // displaying result
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        $(".city").innerText = "Weather in " + name;
        $(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        $(".description").innerText = description;
        $(".temp").innerText = temp + "°C";
        $(".humidity").innerText = "Humidity: " + humidity + "%";   
        $(".wind").innerText = "Wind speed: " + speed + " km/h";
        $(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function() {
        this.fetchWeather($(".search-bar").value);
    }
};

// Search button listener
$(".search button").addEventListener("click", function() {
    weather.search();
});

// Enter key press
$(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.search();
    }
});

