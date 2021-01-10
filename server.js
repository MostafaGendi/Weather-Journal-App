// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`)
});

// Get data route
app.get('/allData', (req, res)=>{
  console.log(projectData);
  res.send(projectData);
})

// Post data route
app.post('/addWeather', newEntry);
function newEntry(req, res){
   newEntry = {
     date: req.body.date ,
     temp: req.body.temp ,
     content: req.body.content
  }
  projectData = newEntry;
  res.send(projectData);
}
