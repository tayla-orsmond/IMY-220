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
                    <input class="form-check-input" type="radio" name="eventAttendance${index}" id="event${index}Attending1" value="${attending[0].correct}">
                    <label class="form-check-label" for="event${index}Attending1">
                        ${attending[0].going}
                    </label>
                </div>
                
                <div class="form-check" data-correct="false">
                    <input class="form-check-input" type="radio" name="eventAttendance${index}" id="event${index}Attending2" value="${attending[1].correct}">
                    <label class="form-check-label" for="event${index}Attending2">
                        ${attending[1].going}
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
    const load = async() => {
        //get the events from events.json
        let json = getEvents("events.json");
        //create the event cards for each event and append them to the eventList div
        json.then((resp) => {
            resp = sortByDate(resp);
            let cards = resp.map((event, index) => createEventCard(event, index));
            $("#eventList").append(cards);
        });
    }
    //initial load events
    load();
    //add event handler that fires when user selects attending option (radio button)
    //if user selects "yes" then a bootstrap correct alert is shown (to say the user is going)
    //if user selects "no" then a bootstrap incorrect alert is shown (to say the user is not going)
    //these are separate for every card
    $("#eventList").on("change", "input[type=radio]", (e) => {
        //attending alert
        const attendingAlert = $("<div></div>", {
            class: "alert alert-success",
            role: "alert",
            html: "You are attending this event!"
        });
        const notAttendingAlert = $("<div></div>", {
            class: "alert alert-danger",
            role: "alert",
            html: "You are not attending this event!"
        });
        //get the value of the radio button
        let going = $(e.target).parent().data("correct");
        //if the value is true then show the attending alert, otherwise show the not attending alert
        let alert = going ? attendingAlert : notAttendingAlert;
        //append the alert to the card
        //remove any other alerts
        $(e.target).parent().parent().find(".alert").remove();
        $(e.target).parent().parent().append(alert);
    });
    $(window).on("scroll", function () {
        // End of the document reached?
        if($(document).height() - $(this).height() - 100 <= $(this).scrollTop()) {
            // Load more events
            load();
        }
    });
});