let list = document.querySelector('#uhover');
const loader = document.getElementById("weatherLoader");
                                                                    // yash
// let lon;
// let lat;

let tempUnit = "celsius";
let windUnit = "kmh";
let precUnit = "mm";

function imp(){
    tempUnit = "fahrenheit";
    windUnit = "mph";
    precUnit = "inch";
    geo();
}
function celsius(){
    tempUnit = "celsius";
    geo();
}
function far(){
    tempUnit = "fahrenheit";
    geo();
}
function kmh(){
    windUnit = "kmh";
    geo();
}
function mph(){
    windUnit = "mph";
    geo();
}
function mm(){
    precUnit = "mm";
    geo();
}
function inch(){
    precUnit = "inch";
    geo();
}

const weatherNames = {

0:"Clear Sky",
1:"Mainly Clear",
2:"Partly Cloudy",
3:"Overcast",

45:"Fog",
48:"Fog",

51:"Light Drizzle",
53:"Moderate Drizzle",
55:"Heavy Drizzle",

56:"Freezing Drizzle",
57:"Freezing Drizzle",

61:"Light Rain",
63:"Moderate Rain",
65:"Heavy Rain",

66:"Freezing Rain",
67:"Heavy Freezing Rain",

71:"Light Snow",
73:"Moderate Snow",
75:"Heavy Snow",

77:"Snow Grains",

80:"Rain Showers",
81:"Heavy Rain Showers",
82:"Violent Rain Showers",

85:"Snow Showers",
86:"Heavy Snow Showers",

95:"Thunderstorm",
96:"Thunderstorm With Hail",
99:"Severe Thunderstorm"

};

function hover(){
list.classList.toggle('active');
}
function geo(){
    navigator.geolocation.getCurrentPosition(function(position){
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;


        weather(lat, lon);
        geolocation(lat, lon);
    })
}

async function geolocation(lat,lon){
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const result = await fetch(url);
    const data = await result.json();

    const country = data.countryName;
    const city = data.principalSubdivision;
    console.log(country,city);
    const location = document.querySelector('#location').innerHTML = `${city}, ${country}`;
}

async function weather(lat,lon){
    loader.classList.add("show");

    try{
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&wind_speed_unit=${windUnit}&temperature_unit=${tempUnit}&precipitation_unit=${precUnit}`;
    let result = await fetch(url);
    let data = await result.json();
    let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


    let temp = data.current.temperature_2m;
    let windspeed = data.current.wind_speed_10m;
    let apparenttemp = data.current.apparent_temperature;
    let precipitation = data.current.precipitation;
    let humidity = data.current.relative_humidity_2m;
    let wc= data.current.weather_code;
    let weathcode= document.querySelector('#weathcode');
    let ctime = new Date(data.current.time);
    
    let fctime = ctime.toLocaleString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    console.log(fctime);
6   
    document.querySelector('#temp').innerHTML = temp + tempUnit;
    document.querySelector('#apparent').innerHTML = apparenttemp + tempUnit;
    document.querySelector('#wind').innerHTML = windspeed + windUnit;
    document.querySelector('#precipitation').innerHTML = precipitation + precUnit;
    document.querySelector('#humidity').innerHTML = humidity + "%";
    document.querySelector('#ctime').innerHTML = fctime;


    if(wc==0){
        weathcode.innerHTML = '☀️';
    }
    else if(wc>=1 && wc<=3){
        weathcode.innerHTML = '⛅';
    }
    else if(wc==45 || wc==48){
        weathcode.innerHTML = '🌁';
    }
    else if(wc==51 || wc==53 || wc==55){
        weathcode.innerHTML = '🌧️';
    }
    else if(wc==56 || wc==57){
        weathcode.innerHTML = '❄️';
    }
    else if(wc==61 || wc==63 || wc==65 ){
        weathcode.innerHTML = '🌧️';
    }
    else if(wc==66 || wc==67){
        weathcode.innerHTML = '🌧️❄️';
    }
    else if(wc==71 || wc==73 || wc==75){
        weathcode.innerHTML = '🌨️';
    }
    else if(wc==77){
        weathcode.innerHTML = '❄️';
    }
    else if(wc==80 || wc==81 || wc==82){
        weathcode.innerHTML = '🌦️';
    }

    else if(wc==85 || wc==86){
        weathcode.innerHTML = '🌨️';
    }
    else if(wc==95){
        weathcode.innerHTML = '⛈️';
    }
    else if(wc==96 || wc==99){
        weathcode.innerHTML = '⛈️';
    }
    else{
        weathcode.innerHTML = 'NA';
    }



    for(i=0; i<7; i++){
        let dtempmax = data.daily.temperature_2m_max[i];
        let dtempmin = data.daily.temperature_2m_min[i];
        let dwc = data.daily.weather_code[i];
        document.querySelector("#weatherName").innerHTML = weatherNames[wc] || "Unknown";
        let ddate = new Date(data.daily.time[i]);
        let dday = days[ddate.getDay()];



        document.querySelector(`#dmax${i}`).innerHTML = dtempmax;
        document.querySelector(`#dmin${i}`).innerHTML = dtempmin;
        document.querySelector(`#dday${i}`).innerHTML = dday;
        console.log(dwc);

        if(dwc==0){
            document.querySelector(`#dwc${i}`).innerHTML = '☀️';
        }
        else if(dwc>=1 && dwc<=3){
            document.querySelector(`#dwc${i}`).innerHTML = '⛅';
        }
        else if(dwc==45 || dwc==48){
            document.querySelector(`#dwc${i}`).innerHTML = '🌁';
        }
        else if(dwc==51 || dwc==53 || dwc==55){
            document.querySelector(`#dwc${i}`).innerHTML = '🌧️';
        }
        else if(dwc==56 || dwc==57){
            document.querySelector(`#dwc${i}`).innerHTML = '❄️';
        }
        else if(dwc==61 || dwc==63 || dwc==65 ){
            document.querySelector(`#dwc${i}`).innerHTML = '🌧️';
        }
        else if(dwc==66 || dwc==67){
            document.querySelector(`#dwc${i}`).innerHTML = '🌧️❄️';
        }
        else if(dwc==71 || dwc==73 || dwc==75){
            document.querySelector(`#dwc${i}`).innerHTML = '🌨️';
        }
        else if(dwc==77){
            document.querySelector(`#dwc${i}`).innerHTML = '❄️';
        }
        else if(dwc==80 || dwc==81 || dwc==82){
            document.querySelector(`#dwc${i}`).innerHTML = '🌦️';
        }

        else if(dwc==85 || dwc==86){
            document.querySelector(`#dwc${i}`).innerHTML = '🌨️';
        }
        else if(dwc==95){
            document.querySelector(`#dwc${i}`).innerHTML = '⛈️';
        }
        else if(dwc==96 || dwc==99){
            document.querySelector(`#dwc${i}`).innerHTML = '⛈️';
        }
        else{
            document.querySelector(`#dwc${i}`).innerHTML = 'NA';
        }
        }





    let dtemp = data.daily.temperature_2m_max[0];
    let dtem = data.daily.temperature_2m_min[0];
    let dwc = data.daily.weather_code[0];


    // console.log(dtemp,dtem,dwc);
    // console.log(wc);
    // console.log(humidity);
    // console.log(precipitation);
    // console.log(apparenttemp);
    // console.log(temp);
    // console.log(windspeed);
    // console.log(ddate);
    loader.classList.add("show");      
                                                                                    //   yash
    const hourrow = document.querySelectorAll('.hour-row');
    for(i=0; i<8; i++){
        const htemp = data.hourly.temperature_2m[i];
        const hwc = data.hourly.weather_code[i];
        hourrow[i].querySelector(".hour-temp").innerHTML = htemp;
        
        if(hwc==0){
            hourrow[i].querySelector(".hour-icon").innerHTML = '☀️';
        }
        else if(hwc>=1 && hwc<=3){
            hourrow[i].querySelector(".hour-icon").innerHTML = '⛅';
        }
        else if(hwc==45 || hwc==48){
            hourrow[i].querySelector(".hour-icon").innerHTML = '🌁';
        }
        else if(hwc==51 || hwc==53 || hwc==55){
            hourrow[i].querySelector(".hour-icon").innerHTML = '🌧️';
        }
        else if(hwc==56 || hwc==57){
            hourrow[i].querySelector(".hour-icon").innerHTML = '❄️';
        }
        else if(hwc==61 || hwc==63 || hwc==65 ){
            hourrow[i].querySelector(".hour-icon").innerHTML = '🌧️';
        }
        else if(hwc==66 || hwc==67){
            hourrow[i].querySelector(".hour-icon").innerHTML = '🌧️❄️';
        }
        else if(hwc==71 || hwc==73 || hwc==75){
            hourrow[i].querySelector(".hour-icon").innerHTML = '🌨️';
        }
        else if(hwc==77){
            hourrow[i].querySelector(".hour-icon").innerHTML = '❄️';
        }
        else if(hwc==80 || hwc==81 || hwc==82){
            hourrow[i].querySelector(".hour-icon").innerHTML = '🌦️';
        }

        else if(hwc==85 || hwc==86){
            hourrow[i].querySelector(".hour-icon").innerHTML = '🌨️';
        }
        else if(hwc==95){
            hourrow[i].querySelector(".hour-icon").innerHTML = '⛈️';
        }
        else if(hwc==96 || hwc==99){
            hourrow[i].querySelector(".hour-icon").innerHTML = '⛈️';
        }
        else{
            hourrow[i].querySelector(".hour-icon").innerHTML = 'NA';
        }
    }
}


catch(error){
    console.log(error);
}
finally{
    loader.classList.remove("show");
    }
}

document.addEventListener("click", function(e){
    if(!list.contains(e.target) && !document.querySelector(".units").contains(e.target)){
        list.classList.remove("active");
    }
});
geo();


const daySelect = document.querySelector(".day-select");
const dayMenu = document.querySelector(".daymenu");
const dayButtons = document.querySelectorAll(".daymenu li button");

daySelect.addEventListener("click", function(e){
    e.stopPropagation();
    dayMenu.classList.toggle("show");
});
dayButtons.forEach(function(button){
    button.addEventListener("click", function(){
        daySelect.innerHTML = this.innerHTML + " ▼";
        dayMenu.classList.remove("show");
    });
});
document.addEventListener("click", function(e){

    if(!dayMenu.contains(e.target) && !daySelect.contains(e.target)){
        dayMenu.classList.remove("show");
    }

});




