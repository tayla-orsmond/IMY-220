//Tayla Orsmond 21467456
$(() => {
    const getEvents = (url) => {
        return new Promise((resolve, reject) => {
            $.getJSON(url)
            .done((resp) => {
                resolve(resp);
            })
            .fail(() => {
                reject("error");
            });
        });
    };
    const createEventCard = ({title, description, date, attending}, index) => {
        return `<div class="card mb-3">
            <div class="card-header">${title}</div>
            <div class="card-body">
                <p>${description}</p>
                <b>${date}</b>
                <p>Will you be attending?</p>
                <div class="form-check" data-correct="true">
                    <input class="form-check-input" type="radio" name="eventAttendance1" id="event${index}Attending1">
                    <label class="form-check-label" for="event${index}Attending1">
                        Yes
                    </label>
                </div>
                
                <div class="form-check" data-correct="false">
                    <input class="form-check-input" type="radio" name="eventAttendance1" id="event${index}Attending2">
                    <label class="form-check-label" for="event${index}Attending2">
                        No
                    </label>
                </div>

            </div>
        </div>`;
    }
    //sort events by date
    const sortByDate = (events) => {
        return events.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    }
    //get the events from events.json
    let json = getEvents("events.json");
    //create the event cards for each event and append them to the eventList div
    json.then((resp) => {
        let cards = resp.map((event, index) => createEventCard(event, index));
        sortByDate(cards);
        $("#eventList").append(cards);
    });
});