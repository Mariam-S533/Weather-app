const rowData = document.getElementById('rowData')
const inputSer = document.querySelector("input")
let wData = {}

async function getdata(city = 'cairo') {
    if (city.length === 0) getdata()
    if (city.length < 3) return;
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=dad0d5a50f6b4644a99182234250607&q=${city}&days=3`);
        if (!response.ok) {
            throw new Error(`error! status: ${response.status}`);
        }

        let data = await response.json();   
        wData = data 
        display(wData.forecast.forecastday)
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}


function fetchdata(Data){
        const day = Data
        const dateObj = new Date(day.date);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const month = dateObj.toLocaleString('en-US', { month: 'long' });
        const dateNum = dateObj.getDate();
        return {dayName, dateNum, month}
}






async function display(arrData) {
    let output = "";

    for (let i = 0; i < arrData.length; i++) {
        const day = arrData[i];
        const dateObj = fetchdata(day);

        let className = i === 0 ? "today" : i === 1 ? "tomorrow" : "se-tomorrow";

        let temp = i === 0
            ? `
                <div class=" align-items-center">
                    <div class="me-2"><h1>${day.day.avgtemp_c}&deg; C</h1></div>
                    <div><img src="https:${day.day.condition.icon}" width="48px"></div>
                </div>
              `
            : `
                <div class="mb-3"><img src="https:${day.day.condition.icon}" width="48px" alt="weather"></div>
                <div class="Max-deg me-2">${day.day.maxtemp_c}&deg; C</div>
                <div class="min-deg me-2">${day.day.mintemp_c}&deg;</div>
              `;

        output += `
        <div class="col-sm-12 col-md-12 col-lg-4 ${className}">
            <div class="header d-flex ${i === 0 ? 'justify-content-between' : 'justify-content-center'}">
                <div>${dateObj.dayName}</div>
                ${i === 0 ? `<div>${dateObj.dateNum} ${dateObj.month}</div>` : ''}
            </div>
            <div class="item">
                <div class="content">
                    ${i === 0 ? `<div class="contry mb-3">${wData.location.name}</div>` : ''}
                    ${temp}
                </div>
                <div class="states">${day.day.condition.text}</div>
                ${i === 0 ? `
                <div class="d-flex px-3">
                    <span class="me-4"><img src="./weather/icon-umberella.png" class="me-1">${day.day.daily_chance_of_rain}%</span>
                    <span class="me-4"><img src="./weather/icon-wind.png" class="me-1">${day.day.maxwind_kph}Km/h</span>
                    <span class="me-4"><img src="./weather/icon-compass.png" class="me-1">${day.hour[12].wind_dir}</span>
                </div>
                ` : ''}
            </div>
        </div>`;
    }

    rowData.innerHTML = output;
}



inputSer.addEventListener("input", function(e){
    getdata(e.target.value)
})

getdata()