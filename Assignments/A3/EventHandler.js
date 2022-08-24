//Tayla Orsmond u21467456
//Even Handler class
function EventHandler(events){
    this.events = events;
    
    this.getEventsBetweenDates = function (startDate, endDate) {
        this.events = this.events.filter(function (event) {
            return event.dateStart >= startDate && event.dateEnd <= endDate;
        });
        return this;
    }
    this.getByMonth = function (month) {
        this.events = this.events.filter(function (event) {
            return event.dateStart.substr(5,2) == month;
        });
        return this;
    }
    this.getUniqueDateAndSort = function () {
        this.events = this.events.sort(function (a, b) {//sort by month
            return a.dateStart.substr(5,2) - b.dateStart.substr(5,2);
        }).filter(function (event, index, self) {
            return self.findIndex(function (t) {//find my index and return true if I am unique (the first index)
                return t.dateStart == event.dateStart && t.dateEnd == event.dateEnd;
            }) == index;
        });
        return this;
    }
    this.getSummary = function (arr) {
        var args= Array.prototype.slice.apply(arguments);
        var summary = [];

        var summarize = function (array) {
            return array.map(function (event) {
                if(event.dateStart === event.dateEnd){
                    return "On " + event.dateStart +": " +event.name+ " (" + event.description+ ")";
                }
                else{
                    return "From " + event.dateStart +" to " +event.dateEnd + ": " +event.name+ " (" + event.description+ ")";
                }
            });
        }
        
        if(arr != undefined && arr.constructor === Array){
            summary = summarize(arr);
        }
        else if(args.length > 0){
            summary = summarize(args);
        }
        else{
            summary = summarize(this.events);
        }
        return summary;
    }
    Array.prototype.getEventsBetweenDates = this.getEventsBetweenDates;
    Array.prototype.getByMonth = this.getByMonth;
    Array.prototype.getUniqueDateAndSort = this.getUniqueDateAndSort;
    Array.prototype.getSummary = this.getSummary;
    Array.prototype.summarize = this.summarize;
}

var eh = new EventHandler(events);
// console.log(eh.events);
// console.log(eh.getEventsBetweenDates("2022/01/13", "2022/05/16"));
// console.log(eh.getByMonth("06"));
// console.log(eh.getUniqueDateAndSort());
// console.log(eh.getSummary([{name: 'Pizza party', description: "Pizza party at work",
// dateStart: '2022/07/10', dateEnd: '2022/07/10'},{name: 'Pizza party 3', description: "Pizza party at work",
// dateStart: '2022/07/10', dateEnd: '2022/07/11'}]));
// console.log(eh.getEventsBetweenDates("2022/01/13", "2022/05/16").getSummary());