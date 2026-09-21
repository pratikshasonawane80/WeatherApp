// ==========================================
// OPENWEATHER API KEY
// ==========================================

const API_KEY = "0fabe8b9830049784a108f118e4c52a0";


// ==========================================
// HTML ELEMENTS
// ==========================================

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const cityName = document.getElementById("cityName");
const country = document.getElementById("country");

const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feels = document.getElementById("feels");
const clouds = document.getElementById("clouds");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");

const detailWind = document.getElementById("detailWind");
const detailFeels = document.getElementById("detailFeels");
const detailHumidity = document.getElementById("detailHumidity");

const highTemp = document.getElementById("highTemp");
const lowTemp = document.getElementById("lowTemp");

const weatherIcon = document.getElementById("weatherIcon");

const date = document.getElementById("date");
const dayName = document.getElementById("dayName");

const hourNow = document.getElementById("hourNow");


// ==========================================
// SEARCH BUTTON
// ==========================================

searchBtn.addEventListener("click", function () {

    const searchCity = cityInput.value.trim();

    if (searchCity === "") {

        alert("Please enter city name.");

        return;
    }

    getWeather(searchCity);

});


// ==========================================
// ENTER KEY
// ==========================================

cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});


// ==========================================
// GET WEATHER BY CITY
// ==========================================

async function getWeather(searchCity) {

    try {

        showLoading();


        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchCity)}&appid=${API_KEY}&units=metric`;


        console.log("Weather URL:", url);


        const response = await fetch(url);


        const data = await response.json();


        console.log("OpenWeather response:", data);


        // ==================================
        // API ERROR
        // ==================================

        if (!response.ok) {

            if (response.status === 401) {

                throw new Error(
                    "INVALID_API_KEY"
                );

            }


            if (response.status === 404) {

                throw new Error(
                    "CITY_NOT_FOUND"
                );

            }


            throw new Error(
                data.message || "WEATHER_ERROR"
            );

        }


        // ==================================
        // UPDATE WEATHER
        // ==================================

        updateWeather(data);

    }


    catch (error) {

        console.error(
            "Weather Error:",
            error
        );


        if (
            error.message ===
            "INVALID_API_KEY"
        ) {

            alert(
                "❌ API Key invalid आहे किंवा activate झालेली नाही."
            );

        }


        else if (
            error.message ===
            "CITY_NOT_FOUND"
        ) {

            alert(
                "❌ City सापडले नाही. City name तपासा."
            );

        }


        else {

            alert(
                "❌ Weather data मिळवताना error आला.\n\n" +
                error.message
            );

        }

    }

}


// ==========================================
// UPDATE WEATHER UI
// ==========================================

function updateWeather(data) {


    // ==================================
    // CITY
    // ==================================

    cityName.innerText =
        data.name;


    // ==================================
    // COUNTRY
    // ==================================

    country.innerText =
        getCountryName(data.sys.country);


    // ==================================
    // TEMPERATURE
    // ==================================

    temperature.innerText =
        Math.round(data.main.temp) + "°";


    // ==================================
    // DESCRIPTION
    // ==================================

    description.innerText =
        capitalize(
            data.weather[0].description
        );


    // ==================================
    // FEELS LIKE
    // ==================================

    const feelsValue =
        Math.round(data.main.feels_like);

    feels.innerText =
        feelsValue + "°";

    detailFeels.innerText =
        feelsValue + "°";


    // ==================================
    // HUMIDITY
    // ==================================

    humidity.innerText =
        data.main.humidity + "%";

    detailHumidity.innerText =
        data.main.humidity + "%";


    // ==================================
    // WIND
    // ==================================

    const windKmh =
        data.wind.speed * 3.6;

    const windText =
        windKmh.toFixed(1) + " km/h";

    wind.innerText =
        windText;

    detailWind.innerText =
        windText;


    // ==================================
    // CLOUDS
    // ==================================

    clouds.innerText =
        data.clouds.all + "%";


    // ==================================
    // PRESSURE
    // ==================================

    pressure.innerText =
        data.main.pressure + " hPa";


    // ==================================
    // VISIBILITY
    // ==================================

    if (data.visibility !== undefined) {

        const visibilityKm =
            data.visibility / 1000;

        visibility.innerText =
            visibilityKm.toFixed(1) + " km";

    }


    // ==================================
    // HIGH / LOW
    // ==================================

    highTemp.innerText =
        Math.round(data.main.temp_max) + "°";

    lowTemp.innerText =
        Math.round(data.main.temp_min) + "°";


    // ==================================
    // WEATHER ICON
    // ==================================

    const iconCode =
        data.weather[0].icon;


    weatherIcon.innerHTML =
        `<img
            src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
            alt="${data.weather[0].description}"
        >`;


    // ==================================
    // CURRENT HOURLY CARD
    // ==================================

    hourNow.innerText =
        Math.round(data.main.temp) + "°";


    // ==================================
    // DATE
    // ==================================

    updateDate();


    // ==================================
    // CHANGE BACKGROUND
    // ==================================

    updateWeatherBackground(
        data.weather[0].id
    );

}


// ==========================================
// UPDATE DATE
// ==========================================

function updateDate() {

    const now =
        new Date();


    dayName.innerText =
        now.toLocaleDateString(
            "en-IN",
            {
                weekday: "long"
            }
        );


    date.innerText =
        now.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


// ==========================================
// LOADING
// ==========================================

function showLoading() {

    cityName.innerText =
        "Loading...";

    temperature.innerText =
        "--°";

    description.innerText =
        "Getting weather...";

    humidity.innerText =
        "--%";

    wind.innerText =
        "-- km/h";

}


// ==========================================
// COUNTRY NAME
// ==========================================

function getCountryName(code) {

    const countries = {

        IN: "India",
        US: "United States",
        GB: "United Kingdom",
        CA: "Canada",
        AU: "Australia",
        AE: "United Arab Emirates",
        SG: "Singapore",
        JP: "Japan",
        FR: "France",
        DE: "Germany",
        IT: "Italy",
        ES: "Spain",
        BR: "Brazil",
        RU: "Russia",
        CN: "China"

    };


    return countries[code] || code;

}


// ==========================================
// CAPITALIZE
// ==========================================

function capitalize(text) {

    return text
        .charAt(0)
        .toUpperCase()
        + text.slice(1);

}


// ==========================================
// LOCATION BUTTON
// ==========================================

locationBtn.addEventListener(
    "click",
    function () {

        if (!navigator.geolocation) {

            alert(
                "Your browser does not support location."
            );

            return;
        }


        navigator.geolocation.getCurrentPosition(

            function (position) {

                const lat =
                    position.coords.latitude;

                const lon =
                    position.coords.longitude;


                getWeatherByLocation(
                    lat,
                    lon
                );

            },


            function () {

                alert(
                    "Location permission denied."
                );

            }

        );

    }
);


// ==========================================
// WEATHER BY GPS LOCATION
// ==========================================

async function getWeatherByLocation(
    lat,
    lon
) {

    try {

        showLoading();


        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;


        const response =
            await fetch(url);


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Location weather error"
            );

        }


        updateWeather(data);

    }


    catch (error) {

        console.error(error);

        alert(
            "❌ Location weather मिळाले नाही."
        );

    }

}


// ==========================================
// WEATHER BACKGROUND
// ==========================================

function updateWeatherBackground(id) {

    if (id >= 200 && id < 300) {

        document.body.style.background =
            "linear-gradient(135deg,#373B44,#4286f4)";

    }

    else if (id >= 300 && id < 600) {

        document.body.style.background =
            "linear-gradient(135deg,#536976,#292E49)";

    }

    else if (id >= 600 && id < 700) {

        document.body.style.background =
            "linear-gradient(135deg,#83a4d4,#b6fbff)";

    }

    else if (id >= 700 && id < 800) {

        document.body.style.background =
            "linear-gradient(135deg,#757F9A,#D7DDE8)";

    }

    else if (id === 800) {

        document.body.style.background =
            "linear-gradient(135deg,#4facfe,#00f2fe)";

    }

    else {

        document.body.style.background =
            "linear-gradient(135deg,#667eea,#764ba2)";

    }

}


// ==========================================
// DARK MODE
// ==========================================

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark-mode"
        );

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            themeBtn.innerText = "☀️";

        }

        else {

            themeBtn.innerText = "🌙";

        }

    }
);


// ==========================================
// DEFAULT CITY
// ==========================================

getWeather("Pune");
