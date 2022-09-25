//Tayla Orsmond u21467456
//Allow users to login using the credentials from users.json
//Allow users to login via the form on index.html
//Using the user info, a call must be made to events.json to get the events for that user
//Sequential promises must be used to get the events for the user
//The events must be displayed on the page as bootstrap cards

$(() => {
    //event card template
    const eventCard = ({title, description, date}) => {
        return `<div class="card col-4">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
                <p class="card-text">${description}</p>
            </div>
        </div>`;
    }
    //error message
    const error = (message) => {
        return `<div class="bg-warning p-3 error" role="alert">
            ${message}
        </div>`;
    }
    //validate the login
    const validateLogin = () => {
        return new Promise((resolve, reject) => {
            //get the username and password from the form
            let username = $("#username").val();
            let password = $("#password").val();
            //check if the username and password are empty
            if (username == "" || password == "") {
                //display an error message
                $(".error").remove();
                reject("Please enter a username and password");
            } else {
                //use a promise to get the users from users.json
                $.getJSON("users.json")
                .done((resp) => {
                    //check if the username and password are correct
                    let user = resp.find((user) => {
                        return user.username == username && user.password == password;
                    });
                    if (user) {
                        //if the username and password are correct, resolve the promise
                        resolve(user);
                    } else {
                        //if the username and password are incorrect, reject the promise
                        reject("Incorrect username or password");
                    }
                })
                .fail(() => {
                    //if the username and password are incorrect, reject the promise
                    reject("Incorrect username or password");
                });
            }
        });
    }
    const getEvents = (user) => {
        return new Promise((resolve, reject) => {
            //get the events for the user from events.json
            $.getJSON("events.json")
            .done((resp) => {
                //filter the events for the user
                let events = resp.filter((event) => {
                    return event.attending.find((attendee) => {
                        return attendee == user.userID;
                    });
                });
                //if there are events for the user, resolve the promise
                if (events.length > 0) {
                    console.log(events);
                    resolve(events);
                } else {
                    //if there are no events for the user, reject the promise
                    reject("No events for this user");
                }
            })
            .fail(() => {
                //if there are no events for the user, reject the promise
                reject("No events for this user");
            });
        });
    }
    //display the events
    const displayEvents = (events) => {
        //loop through the events
        for (const event of events) {
            //display the events
            $(".events").append(eventCard(event));
        }
    }
    //when the login button is clicked, the login function is called
    $("#submitBtn").on("click", (e) => {
        e.preventDefault();
        //call the validateLogin function
        validateLogin()
        .then((user) => {
            //call the getEvents function
            return getEvents(user);
        })
        .then((events) => {
            //call the displayEvents function
            $("#loginForm").hide();
            displayEvents(events);
        })
        .catch((message) => {
            //display an error message
            $(".error").remove();
            $("#loginForm").append(error(message));
        });
    });
});