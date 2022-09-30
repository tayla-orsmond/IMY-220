//Tayla Orsmond u21467456
//Language: javascript, node.js
//This file contains the functionality for validating the event data
//It will export two functions, one to validate the event name and one to validate the event date

//export the checkDate function
module.exports.checkDate = (date) => {
    //the date given must fall between the range September 9th (excluded) and September 21st (included)
    //create a variable to store the start date
    var startDate = new Date("2022/09/09");
    //create a variable to store the end date
    var endDate = new Date("2022/09/21");
    //create a variable to store the date given
    var givenDate = new Date(date);
    //if the date given is within the range (same month, between days, year is irrelevant), return true
    //otherwise return false
    return (givenDate.getMonth() === startDate.getMonth()) && (givenDate.getDate() > startDate.getDate()) && (givenDate.getDate() <= endDate.getDate());
}

//export the checkName function
module.exports.checkName = (name) => {
    //check if the name contains any special characters or numbers
    //if it does, return true
    //otherwise return false
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(name);
}
