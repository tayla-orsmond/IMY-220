//Tayla Orsmond u21467456

//importing react
import React from 'react';
import ReactDOM from 'react-dom';
//importing prop types
import PropTypes from 'prop-types';
//importing the event component
import Event from './Event';

//eventlist component
//renders a list of events based on the events array that it gets from its prop, and the date that it gets from its prop
class EventList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //filtering the events array based on the date that was passed to the eventlist component
        const filteredEvents = this.props.events.filter(event => event.date === this.props.date);
        //mapping the filtered events array to a list of event components
        const eventList = filteredEvents.map(event => <Event event={event} />);
        return (
            <div className="row">
                <h2 class="col-12">Events on the {this.props.date}</h2>
                {eventList}
            </div>
        );
    }
}

//proptype validation for the date (must be a string)
EventList.propTypes = {
    date: PropTypes.string.isRequired
};

//exporting the eventlist component
export default EventList;