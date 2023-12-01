//state
let state = {
    events: []
};

//container elements 
const partiesContainer = document.getElementById('partyList')
const formContainer = document.querySelector('#addEvent')
formContainer.addEventListener("submit", newEvent)

//API URL 
const APIurl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events'

//fetch recipes
async function fetchAPIevents() {
    try {
        const APIresponse = await fetch(APIurl);
        const APIconverted = await APIresponse.json()
        state.events = APIconverted.data
        console.log(state.events)
        return state.events;
    } catch (error) {
        console.log(error);
    }
}

//render function 
function renderEvents() { // const events from fetchAPIevents() will feed into (eventsParam)

    //if statement for if no data is found
    if (!state.events.length || state.events.length === 0) {
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
            <h3>ID: ${ele.id}</h3>
            <p>Description: <br/>${ele.description}</p>`
            ;

        const deleteButton = document.createElement('button')
        deleteButton.textContent = "Delete Event"
        event.append(deleteButton)
        deleteButton.addEventListener("click", () => deleteEvent(ele.id))

        return event;
    })
    partiesContainer.replaceChildren(...eventsData)
}

//init for the pageload
async function initialize() {
    await fetchAPIevents();
    renderEvents();
}

initialize();

async function newEvent(e) {
    e.preventDefault();

    console.log(formContainer.name.value)
    try {
        const response = await fetch(APIurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formContainer.name.value,
                date: `${formContainer.date.value}:00.000Z`,
                location: formContainer.location.value, 
                description: formContainer.description.value
            })
        });
        // const newEventCreated = await response.json() //unnecessary
        // console.log(newEventCreated)
        if (!response.ok) {
            throw new Error("failed to create new event")
        };
        initialize()
    }
    catch (error) {
        console.log(error)
    }
}

async function deleteEvent(id) {
    try {
        const response = await fetch(`${APIurl}/${id}`, { //targeting the object with ID specified in API
            method: "DELETE",
        })
        initialize()
    } catch (error) {
        console.error(error)
    }
}