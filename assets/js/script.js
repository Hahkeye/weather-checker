//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=f850e219e63b844872fab8992ab03f6c
//https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=f850e219e63b844872fab8992ab03f6c

const test1 = await fetch('https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=f850e219e63b844872fab8992ab03f6c').then(response =>{
    return response.json();
}).then(users=>{
    console.log("Success");
});

console.log(test1);