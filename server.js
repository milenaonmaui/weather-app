// Setup empty JS object to act as endpoint for all routes
const API_KEY = process.env.API_KEY
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='

projectData = {zip: 90000};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.get('/getData', function(req, res){
    console.log("Inside getData ")
    getWeatherData(baseURL, projectData.zip, API_KEY)
        .then(function(response){
            projectData.temp = response.list[0].main.temp;
            projectData.city = 'Kahului';
        });
    res.send(projectData)
})

app.post('/addData', addData)

function addData(req, res) {
    
    projectData.zip = parseInt(req.body.zip);
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData)
}

const getWeatherData = async (baseURL, zip=90000, API_KEY) =>{ 
    
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