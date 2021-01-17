/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const data = {temperature: 80, date: newDate, userResponse: "Fake new"}
const button = document.getElementById("generate");


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

button.addEventListener('click', postData('/addData', data));
//postData('/addData', data)
