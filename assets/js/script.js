//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=f850e219e63b844872fab8992ab03f6c
//https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=f850e219e63b844872fab8992ab03f6c
//(0K − 273.15) × 9/5 + 32 = -459.7°F
var historylist=[];
class Day{
    constructor(min,max,current,feels,date,windSpeed,windDirection,hum,name,icon){
        this.currentTempature=Math.floor(1.8*(current-273)+32);
        this.feelsLike=Math.floor(1.8*(feels-273)+32);
        this.minTempature=Math.floor(1.8*(min-273)+32);
        this.maxTempature=Math.floor(1.8*(max-273)+32);
        this.windSpeed=windSpeed;//in mph
        this.windDirection=windDirection;//in degrees
        this.date=date;//data and time because we coolike that
        this.name=name;
        this.humidity=hum;
        this.icon=icon
    }

    html() {
        let diver = $('<div>').attr('class','col-md');
        let cardDiv = $('<div>').attr('class','card');
        cardDiv.append($('<img>').attr('src',`https://openweathermap.org/img/wn/${this.icon}.png`).attr('class','card-img-top'));//`https://openweathermap.org/img/wn/${day.icon}.png`
        // cardDiv.append($('<div>').append());
        let cardBody = $('<div>').attr('class','card-body');
        cardBody.append($('<p>').text(moment.unix(this.date).format("MM/DD/YY")).attr('class','card-title'));
        // cardDiv.append($('<p>').text(moment.unix(this.date).format("MM/DD/YY")).attr('class','card-title'));
        let list = $('<ul>').attr('class','list-group list-group-flush');
        list.append($('<li>').text(`Current Tempature: ${this.currentTempature}°F`).attr('class','list-group-item'));
        list.append($('<li>').text(`Feels Like: ${this.feelsLike}°F`).attr('class','list-group-item'));
        list.append($('<li>').text(`Humidity: ${this.humidity}%`).attr('class','list-group-item'));
        list.append($('<li>').text(`Maxium Tempature: ${this.maxTempature}°F`).attr('class','list-group-item'));
        list.append($('<li>').text(`Current Tempature: ${this.currentTempature}°F`).attr('class','list-group-item'));
        list.append($('<li>').text(`${this.windSpeed} MPH from ${this.windDirection}°`).attr('class','list-group-item'));
        // cardDiv.append($('<p>').text(`Current Tempature: ${this.currentTempature}°F`));
        // cardDiv.append($('<p>').text(`Feels Like: ${this.feelsLike}°F`));
        // cardDiv.append($('<p>').text(`Humidity: ${this.humidity}%`));
        // cardDiv.append($('<p>').text(`Maxium Tempature: ${this.maxTempature}°F`));
        // cardDiv.append($('<p>').text(`Minium Tempature: ${this.minTempature}°F`));
        // cardDiv.append($('<p>').text(`${this.windSpeed} MPH from ${this.windDirection}°`));
        cardDiv.append(cardBody);
        cardDiv.append(list);
        diver.append(cardDiv);
        return diver;
    }
}

function displayHistory(){
    $('#history').empty();
    $('#history').on('click',function(event){
        if(event.target.nodeName == "BUTTON"){
            // console.log("Target, "+$(event.target).attr('target'));
            getWeather($(event.target).attr('target'));
        }
    });
    for(let i of historylist){
        $('#history').append($('<div>').attr("class","row").append($('<button>').text(i).attr('target',i).attr("class","btn btn-dark")));
        // $('#history').append($('<button>').text(i).attr('target',i).attr("class","btn btn-dark"));
    }
}

$(function(){
    if(localStorage.getItem('history')){
        historylist=JSON.parse(localStorage.getItem('history'));
        displayHistory();
    }
    getWeather("Minneapolis");
});

function displayDay(day){
    // console.log(`https://openweathermap.org/img/wn/${day.icon}.png`);
    let today = $('#today-forecast');
    today.children($('#name').text(day.name));
    today.children('#date').text(moment().format("MM/DD/YY"))
    today.children($('#icon').attr('src',`https://openweathermap.org/img/wn/${day.icon}.png`));
    today.children('#current-temp').text(`Current Tempature: ${day.currentTempature}°F`);
    today.children('#feelsLike-temp').text(`Feels Like: ${day.feelsLike}°F`);
    today.children('#humidity').text(`Humidity: ${day.humidity}%`);
    today.children('#max-temp').text(`Maxium Tempature: ${day.maxTempature}°F`);
    today.children('#min-temp').text(`Minium Tempature: ${day.minTempature}°F`);
    today.children('#wind').text(`${day.windSpeed} MPH from ${day.windDirection}°`);
    get5Day(day.name);
}
function displayNF(){
    let today = $('#today-forecast');
    today.children('#name').text("City Not Found");
}

function display5Day(data,name){//every 8
    let tempDays = [];
    for(let x=3;x<data.length;x+=8){
        tempDays.push(new Day(data[x].main.temp_min,data[x].main.temp_max,data[x].main.temp,data[x].main.feels_like,data[x].dt,data[x].wind.speed,data[x].wind.deg,data[x].main.humidity,name,data[x].weather[0].icon));
    }
    // console.log(tempDays);
    let body=$('#fiveday-forecast');
    body.empty();
    for(let d of tempDays){
        // console.log(d)
        // let tempDiv = $('<div>');
        body.append(d.html());
    }
}

function get5Day(city){
    if(!city){
        city=$('#cityname').val();
    }
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f850e219e63b844872fab8992ab03f6c`).then(response =>{
        return response.json();
    }).then(data=>{
        // console.log(data);
        display5Day(data.list,city);
    }).catch(function(error){
        displayNF();
        console.log("Erorr in the api request 2",error);
    });
    // });
}

function getWeather(city){
    if(!city){
        city=$('#cityname').val();
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f850e219e63b844872fab8992ab03f6c`).then(response =>{
        return response.json();
    }).then(data=>{
        let tempD = new Day(data.main.temp_min,data.main.temp_max,data.main.temp,data.main.feels_like,data.dt,data.wind.speed,data.wind.deg,data.main.humidity,data.name,data.weather[0].icon);
        if(!historylist.includes(city.toLowerCase())){
            historylist.push(city.toLowerCase());
            localStorage.setItem("history",JSON.stringify(historylist));
        }
        // console.log(data);
        // console.log(tempD);
        displayHistory();
        displayDay(tempD);
    }).catch(function(error){
        displayNF();
        console.log("Erorr in the api request 1",error);
    });
}

//Group 1

// console.log(test1);