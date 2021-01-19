// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
// Start up an instance of app
const app = express();
/* Middleware*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.get('/getData', function(req, res){
    res.send(projectData)
})

app.post('/addData', addData)

function addData(req, res) {
    
    projectData.temp = parseInt(req.body.temp);
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData)
    console.log("Added data", projectData)
}