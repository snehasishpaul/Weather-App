const apiKey = "186647aac1e48216a9731bdda047dc81";
const URL = "https://api.openweathermap.org/data/2.5/";

const searchBox = document.querySelector("#search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
    if (event.keyCode === 13) {
        try {
            getResult(searchBox.value);
        } catch (error) {
            console.log("ERROR", error);
        }
        // console.log(searchBox.value);
    }
}

const getResult = async (query) => {
    try {
        const response = await fetch(
            `${URL}weather?q=${query}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        // console.log(data);
        let location = document.querySelector(".weather-location h3");
        location.textContent = `${data.name}, ${data.sys.country}`;

        let date = document.querySelector(".weather-date");
        date.textContent = getDate();

        let temp = document.querySelector(".weather-temperature");
        temp.innerHTML = `${Math.round(data.main.temp)}&deg;<small>C</small>`;

        let situation = document.querySelector(".weather-situation");
        situation.textContent = `${data.weather[0].main}`;

        let humidity = document.querySelector(".weather-humidity");
        humidity.textContent = `Humidity: ${data.main.humidity}`;

        let between = document.querySelector(".weather-between");
        between.innerHTML = `${Math.floor(
            data.main.temp_min
        )}&deg;<small>C</small>  /  ${Math.round(
            data.main.temp_max
        )}&deg;<small>C</small>`;
    } catch (error) {
        console.log("ERROR!", error);
    }
};

function getDate() {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let date = new Date();
    const day = days[date.getDay()];
    const dat = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${dat} ${month} ${year}`;
    // console.log(date);
}
