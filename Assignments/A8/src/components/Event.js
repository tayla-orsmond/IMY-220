//Tayla Orsmond u21467456

//importing react
import React from 'react';
import ReactDOM from 'react-dom';
//importing prop types
import PropTypes from 'prop-types';

//event component
//renders a bootstrap card with the event details that it gets from its prop
export class Event extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-4">
                <div className="card">
                    <div className="card-header">
                        {this.props.event.name}
                    </div>
                    <div className="card-body">
                        <p className="card-text"><span className='fw-bold'>Description:</span> {this.props.event.description}</p>
                        <p className="card-text"><span className='fw-bold'>Date:</span> {this.props.event.date}</p>
                    </div>
                </div>
            </div>
        );
    }
}
//proptype validation for the event (must be an object)
Event.propTypes = {
    event: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
};

//exporting the event component
export default Event;