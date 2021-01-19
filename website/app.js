/* Global Variables */

const API_KEY = '5107f2e7c18d313fdf274b051884c517'
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
//API CALL
//http://api.openweathermap.org/data/2.5/forecast?zip=96732&units=imperial&appid=5107f2e7c18d313fdf274b051884c517

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const data = {temperature: 80, date: newDate, userResponse: "Fake new"}
const form = document.getElementById('form');
let res = {}

const handleSubmit = (e) => {
    e.preventDefault();
    const zip = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value
    getWeatherData(baseURL, zip, API_KEY)
    .then(function(response){
        console.log("In then ", response.city.name, response.list[0].main.temp, userFeelings)
        postData('/addData', {temperature: response.list[0].main.temp, date: newDate, userResponse: userFeelings} )
    })
}

const getWeatherData = async (baseURL, zip, API_KEY) =>{ 
    
    const url = baseURL + zip + '&units=imperial&appid=' + API_KEY;
    const request = await fetch(url);
    try {
    // Transform into JSON
    const response = await request.json()
    
    console.log("Response: ", response.city.name, response.list[0].main.temp )
    //alert(`response received ${response.list[0].main.temp}`);
    res=response;
    return response;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

const postData = async(url='', data = {}) => {
    console.log('In postData')
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        console.log(newData)
        return newData
    } catch(error) {
        console.log(error)
    }
}

form.addEventListener('submit', handleSubmit);
//postData('/addData', data)
