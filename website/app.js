/* Global Variables */

const API_KEY = '5107f2e7c18d313fdf274b051884c517'
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]  

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = month[d.getMonth()]+' '+ d.getDate()+','+ d.getFullYear();
const button = document.getElementById('generate');

const handleSubmit = (e) => {
    e.preventDefault();
    const zip = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value
    getWeatherData(baseURL, zip, API_KEY)
    .then(function(response){
        postData('/addData', {temp: response.list[0].main.temp, date: newDate, userResponse: userFeelings})
        .then(
            getData('/getData')
            .then(function(data){
                updateUI(data)
            })
        )
    })
    
}

const getWeatherData = async (baseURL, zip, API_KEY) =>{ 
    
    const url = baseURL + zip + '&units=imperial&appid=' + API_KEY;
    const request = await fetch(url);
    try {
        const response = await request.json()
        return response;
    }
    catch(error) {
        console.log("error", error);
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
        return newData
    } catch(error) {
        console.log(error)
    }
}

const getData = async(url='') => {
    const request = await fetch(url);
    try {
        const response = await request.json();
        return response;
    } catch(error) {
        console.log("Error getting data from server ", error)

    }
}

const updateUI = (data={}) => {
    console.log("In update UI, data: ", data)
    document.getElementById('date').innerHTML = '<b>Date: </b>' + data.date;
    document.getElementById('temp').innerHTML = '<b>Temperature: </b>' + data.temp + '&deg' + 'F' ;
    document.getElementById('content').innerHTML = '<b>My feelings: </b>' + data.userResponse;
    //clear entry values so user can initiate another call
    document.getElementById('zip').value = '';
    document.getElementById('feelings').value = '';
}
button.addEventListener('click', handleSubmit);
