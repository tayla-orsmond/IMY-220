//Tayla Orsmond u21467456
//Language: javascript, node.js
//This file contains the functionality for reading from a text file and writing to a web page

//required modules
var fs = require('fs');
var http = require('http');
var eventValidator = require('./eventValidator.js');

//create a server and listen on port 8888
http.createServer(function (req, res) {
    //read the data from events.json 
    fs.readFile('events.json', function (err, data) {
        //if there is an error, display the error
        if (err) {
            return console.error(err);
        }
        //convert the data read to a JS string and then parese it to a JSON object
        var events = JSON.parse(data.toString());
        //validate and print the events in a table
        res.writeHead(200, {'Content-Type': 'text/html'});
        //start the table
        res.write('<table border="1"><tr><th>Event Name</th><th>Event Description</th><th>Event Date</th><th>Event Details</th></tr>');
        //loop through the events
        events.forEach(event => {
            //write the event name, description and date to the table
            res.write('<tr><td>' + event.title + '</td><td>' + event.description + '</td><td>' + event.date + '</td>');
            //if the event date is valid, write that it is in the date range
            let details = ""
            details += eventValidator.checkDate(event.date) ? "Event is in the date range" : "Event is not in the date range";
            //if the event name is valid, write that it is valid
            details += !eventValidator.checkName(event.title) ? ", This is a valid event title" : ", This is not a valid event title";
            //write the details to the table
            res.write('<td>' + details + '</td></tr>');
        });
        //end the response
        res.end('</table>');
    });
}).listen(8888, '127.0.0.1', () => {
    //display an appropriate message in the command prompt
    console.log('Server running at: http://localhost:8888/');
});