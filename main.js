const apiKey = "f641a8cdf4fdd8dad0b37986a687c30a";
let city;
const searchIcon = document.querySelector(".search .icon");
let cityIp = document.querySelector("#city-ip");

searchIcon.addEventListener("click", () => {
    checkIp();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    async function getWeather() {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            if (data.cod !== 200) {
                setTimeout(() => {
                    errorMsg();
                    clearMsg();
                    throw new Error(data.message);
                }, 5000);
            }
            let news = `
    <div id="weather-card" class="news text-center w-5/6 sm:w-2/4 xl:w-1/4 h-96 shadow-2xl flex flex-col justify-evenly">
        <div class="city flex justify-center items-center my-2">
            <svg class="mx-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
            <p class="city-name text-xl font-semibold main-color">${
                data.name
            }, ${data.sys.country}</p>
        </div>    
        <div class="temp flex items-center justify-center">
            <h6 class="text-[5rem]">${Number(data.main.temp).toFixed(
                1
            )}<sup class="right-0 relative top-[-0.6em] text-slate-800">&degc</sup></h6>
        </div>
        <div class="desc my-2 flex text-xl items-center justify-around">
            <p class="mr-2 main-color">${data.weather[0].main}, ${
                data.weather[0].description
            }</p>
        </div>
        <div class="additional mx-auto py-3 p-6 grid grid-cols-3 gap-x-3">
                <p class="flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thermometer"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                <span class="main-color mt-1">${data.main.feels_like}</span>
                </p>
                <p class="flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wind"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg>
                <span class="main-color mt-1">${data.wind.speed}</span>
                </p>
                <p class="flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-droplet"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
                <span class="main-color mt-1">${data.main.humidity}</span>
                </p>
        </div>
    </div>`;
            document.querySelector(".main-section").innerHTML = news;
            document.querySelector("#weather-card").style.opacity = 1;
        } catch {
            //  console.log("city not found");
            errorMsg();
        }
    }
    getWeather();
});

// *SECTION - Validation
function checkIp() {
    if (cityIp.value === "") {
        errorMsg();
        return;
    } else {
        clearMsg();
        city = cityIp.value
            .slice(0, 1)
            .toUpperCase()
            .concat(cityIp.value.slice(1));
    }
}

// *SECTION - Error msg
function errorMsg() {
    cityIp.value = "";
    cityIp.placeholder = "Enter a valid city";
    cityIp.style.color = "red";
}
function clearMsg() {
    cityIp.placeholder = "";
    cityIp.style.color = "#fff";
}

// *Time Method
document.querySelector(".time").innerHTML = new Date().toLocaleDateString();
