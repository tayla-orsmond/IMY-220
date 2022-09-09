//Tayla Orsmond u21467456
$(() => {
    //promise to load events from events.html
    const eventsPromise = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "events.html",
                type: "GET",
                dataType: "html",
                success: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    reject(error);
                }
            })
        });
    }
    //promise to load event info from events.json
    const eventsInfoPromise = (index) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "events.json",
                type: "GET",
                dataType: "json",
                success: (data) => {
                    resolve(data[index]);
                },
                error: (error) => {
                    reject(error);
                }
            })
        });
    }
    const event_card = ({time, location, weather}) => {
        return `<div class="card">
            <div class="card-body">
                <p class="card-text">Time: ${time}</p>
                <p class="card-text">Location: ${location}</p>
                <p class="card-text">Weather: ${weather}</p>
            </div>
        </div>`
    }
    //event handler for the click event
    //on click, loads an event's data using the promise
    $("#events").on("click", ".col-4", function () {
        //get the clicked event id
        let id = $(this).attr("id");
        let index = $(this).index();
        //load data via promise into event div
        eventsPromise().then((data) => {
            //load data into event div
            $("#event").html($(data).closest("#" + id));
            //load event info into a card
            eventsInfoPromise(index).then((data) => {
                //append the card to the event div
                $("#event").append(event_card(data));
            }).catch((error) => {
                console.log(error);
            });
        });
        //change the css of the clicked event to show it is selected
        $(this).toggleClass("active unactive");
        $(this).siblings().addClass("unactive").removeClass("active");
    });
});
