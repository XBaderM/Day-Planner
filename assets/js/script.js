let currentDate = moment().format("dddd, MMMM Do");
let currentTime = moment().format("HH:mm:ss");
let currentHour = moment().format("HH");

const timeArray = ['09', '10', '11', '12', '13', '14', '15', '16', '17'];
let eventsObject = {}

function updateDateText() {
    $("#currentDay").text(currentDate);
}

// Update time every second
function updateTime() {
    setInterval(() => {
        currentTime = moment().format("HH:mm:ss");
        // Clear localstorage, textareas, #currentDay at midnight
        if (currentTime === "00:00:00") {
            localStorage.clear();
            loadEvents();
            updateDateText();
        }
    }, 1000);
}

// Populate existing stored object properties to textareas
function loadEvents() {
    eventsObject = JSON.parse(localStorage.getItem('eventsObject')) || {};
    console.log(eventsObject)
    for (const key in eventsObject) {
        if (key) {
            $(`#${key}`).val(eventsObject[key])
        } else {
            // clear text fields if storage has been cleared
            $(`#${key}`).val('')
        }
    }
}

function colorCode() {
    // For all time blocks:
    for (const id of timeArray) {
        // If #id (24-hr) is before/same/after currentHour
        // Then update color of textarea to .past/.present/.future
        if (id < currentHour) {
            $(`#${id}`).addClass('past')
        } else if (id === currentHour) {
            $(`#${id}`).addClass('present')
        } else if (id > currentHour) {
            $(`#${id}`).addClass('future')
        }
    }
}

$(".saveBtn").click(function () {
    // get hour from button value
    let hourID = $(this).val();
    // get corresponding textarea by id
    let eventText = $(`#${hourID}`).val();
    // Update local storage object with {hourID: eventText}
    eventsObject[hourID] = eventText;
    localStorage.setItem('eventsObject', JSON.stringify(eventsObject));
})

updateDateText();
updateTime();
loadEvents();
colorCode();