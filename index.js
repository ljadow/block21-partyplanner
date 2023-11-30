//state
let state = [];

//container elements 
const partiesContainer = document.getElementById('partyList')

//API URL 
const APIurl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF'

//fetch recipes
async function fetchAPIevents () {
    try{
        const APIevents = await fetch(`${APIurl}/events`);
        const APIconverted = await APIevents.json();
        console.log(APIconverted);
        state = APIconverted.data
        return state;
    } catch (error){
        console.log(error);
    }
}

//render function 
function renderEvents(eventsParam){ //events is the param -- events from fetchAPIevents will feed into it
    eventsParam.forEach((event,index) => {
        const event_name = document.createElement('div')
        event_name.className=`eventClass`
        event_name.innerHTML=`
        <h2>Event: ${event.name}</h2>
        <h3>When: ${event.date}</h3>
        <h3>Where: ${event.location}</h3>
        <p>Description: <br/>${event.description}</p>
        <button id='deleteButton'>Delete</button>`
        partiesContainer.append(event_name)
        console.log(event_name)
    })
}

//init for the pageload
async function initialize(){
    const events = await fetchAPIevents();

    renderEvents(events); //taking events from line --> result of the fetch
}

initialize();