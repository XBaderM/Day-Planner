let currentDate = moment().format("dddd, MMMM Do");
let currentTime = moment().format("HH:mm:ss");
let currentHour = moment().format("HH");

const timeArray = ['09', '10', '11', '12', '13', '14', '15', '16', '17'];
let eventsObject = {}

function updateDateText() {
    $("#currentDay").text(currentDate);
}

updateDateText();