
/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=b23adda94fa2b37cbdb15d9185c8fddf&units=metric";
const btn = document.getElementById('generate');


// Create a new date instance dynamically with JS
const months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let d = new Date();
let newDate = d.getDate()+' '+ months[d.getMonth()]+' '+ d.getFullYear();

// event listener
btn.addEventListener('click', performAction);

// performAction to excute after user clicks
function performAction(e){
  e.preventDefault();
  const newZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  if (newZip === "") {
    alert("Please Enter A valid Zip Code...")
  }else {
    getWeather(baseURL, newZip, apiKey)
    .then((data)=>{
        console.log(data);
        postData('/addWeather', {date: newDate, temp: data.list[1].main.temp, content:feelings})

        updateUI()// updateUI
      })
  }
};

//  fetch data from api.openweathermap
const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json()
    console.log(data)
    return data

  } catch (error) {
    console.log("error", error)
  }
};

// Post data to the local server
 const postData = async ( url = '', data = {})=>{
   const response = await fetch(url, {
     method: 'POST',
     credentials: 'same-origin',
     headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify(data), // body data type must match "Content-Type" header
   })
   try {
     const newData = await response.json();
     return newData;
   } catch (error) {
     console.log("error", error);
   }
 }

// Update user inetrface
  const updateUI = async ()=>{
    const request = await fetch('/allData')
    try {
      const allData = await request.json();

      document.getElementById('date').innerHTML = `Date: ${allData.date}`;
      document.getElementById('temp').innerHTML = `Temprature: ${allData.temp}`;
      document.getElementById('content').innerHTML = `Feeling: ${allData.content}`;

    } catch (error) {
      console.log("error", error)
    }
  }
