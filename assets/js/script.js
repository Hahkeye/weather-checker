//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=f850e219e63b844872fab8992ab03f6c
//https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=f850e219e63b844872fab8992ab03f6c
//(0K − 273.15) × 9/5 + 32 = -459.7°F

class Day{
    constructor(min,max,current,feels,date,windSpeed,windDirection,name,time){
        this.currentTempature=Math.floor(1.8*(current-273)+32);
        this.feelsLike=Math.floor(1.8*(feels-273)+32);
        this.minTempature=Math.floor(1.8*(min-273)+32);
        this.maxTempature=Math.floor(1.8*(max-273)+32);
        this.windSpeed=windSpeed;//in mph
        this.windDirection=windDirection;//in degrees
        // this.windGustSpeed=windGust;//in mph
        this.date=date;//data and time because we coolike that
        this.name=name;
        // this.time=time;
    }


}

function displayToday(){

}

function displayDay(day){
    console.log(day)
    let today = $('.today-forecast');
    today.children('#name').text(day.name);
    today.children('#date').text(moment().format("MM/DD/YY"))
    today.children('#current-temp').text(`Current Tempature: ${day.currentTempature}°`);
    today.children('#feelsLike-temp').text(`Feels Like: ${day.feelsLike}°`);
    today.children('#max-temp').text(`Maxium Tempature: ${day.maxTempature}°`);
    today.children('#min-temp').text(`Minium Tempature: ${day.minTempature}°`);
    today.children('#wind').text(`${day.windSpeed} MPH from ${day.windDirection}°`);
    get5Day();
}

function display5Day(data,name){//every 8
    let tempDays = [];
    console.log(data.length);
    for(let x=3;x<data.length;x+=8){
        tempDays.push(new Day(data[x].main.temp_min,data[x].main.temp_max,data[x].main.temp,data[x].main.feels_like,data[x].dt,data[x].wind.speed,data[x].wind.deg,data[x].wind.gust,name));
    }
    console.log(tempDays);
    let body=$('.fiveday-forecast')
    

}

function get5Day(){
    let place = $('#cityname').val();
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=f850e219e63b844872fab8992ab03f6c`).then(response =>{
        return response.json();
    }).then(data=>{
        console.log(data);
        display5Day(data.list,data.city.name);
    },(error)=>{
        console.log("DOesnt exists");
    });
}

function getWeather(){
    let place = $('#cityname').val();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=f850e219e63b844872fab8992ab03f6c`).then(response =>{
        return response.json();
    }).then(data=>{
        let tempD = new Day(data.main.temp_min,data.main.temp_max,data.main.temp,data.main.feels_like,data.dt,data.wind.speed,data.wind.deg,data.name);
        console.log(data);
        displayDay(tempD);
    },(error)=>{
        console.log("DOesnt exists");
    });
}

//Group 1

// console.log(test1);