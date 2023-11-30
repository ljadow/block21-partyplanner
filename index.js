//state
let state = {
    events: []
};

//container elements 
const partiesContainer = document.getElementById('partyList')

//API URL 
const APIurl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF'

//fetch recipes
async function fetchAPIevents() {
    try {
        const APIresponse = await fetch(`${APIurl}/events`);
        const APIconverted = await APIresponse.json()
        state.events = APIconverted.data
        return state.events;
    } catch (error) {
        console.log(error);
    }
}

//render function 
function renderEvents(eventsParam) { // const events from fetchAPIevents() will feed into (eventsParam)
    
    //if statement for if no data is found
    if(!eventsParam || eventsParam.length === 0){
        eventsParam.innerHTML = '<h3>No data found</h3>';
        return;
    }
    
    const eventsData = state.events.map((ele, ind) => {
        const event = document.createElement('div')
        event.className = `event`
        //event.setAttribute('id',`num${ind}`)
        event.innerHTML = `
            <h2>Event: ${ele.name}</h2>
            <h3>When: ${ele.date}</h3>
            <h3>Where: ${ele.location}</h3>
            <p>Description: <br/>${ele.description}</p>
            <button class='deleteButton'>Delete</button>`;
        return event;
        
    })
    partiesContainer.replaceChildren(...eventsData)
}

//init for the pageload
async function initialize() {
    const events = await fetchAPIevents();
    renderEvents(events); //taking events from line --> result of the fetch
}

initialize();