var events = [
	{name: "Picnic", description: "Picnic in the park", date: "2022/09/03"},
	{name: "Rock concert", description: "Rock concert at the football stadium", date: "2022/08/13"},
	{name: "Golf day!", description: "Golf day at the local golf course", date: "2022/09/03"},
	{name: "Braai in the park", description: "braai at the community swimming pool", date: "2022/11/05"},
	{name: "Festival", description: "Summer music festival with a lot of artists performing", date: "2022/09/03"},
	{name: "Quiz night", description: "Quiz night at the local pub", date: "2022/11/05"},
	{name: "Fundraiser marathon", description: "Raising money for a very good cause!", date: "2022/10/15"},
	{name: "Date night", description: "Date night at a fancy restaurant", date: "2022/10/26"},
	{name: "Hike", description: "A hike on the otter trail", date: "2022/10/26"},
];

//importing the components
import React from 'react';
import ReactDOM from 'react-dom';
import EventList from './components/EventList';

//FilterEvents component
//allows a user to fill in a date and filter the events based on that date (the date is passed to the eventlist component)
class FilterEvents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: ""
		};
		this.changeDate = this.changeDate.bind(this);
	}
	//function that handles the change in the date input
	changeDate = (event) => {
		//validate that this is a proper date
		if (event.target.value.match(/^\d{4}-\d{2}-\d{2}$/)) {
			//if it is, set the date in the state
			//change the dashes to slashes so that it can be used in the eventlist component
			this.setState({date: event.target.value.replace(/-/g, "/")});
		}
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1>Events</h1>
						<p>Filter events by date:</p>
						<input type="date" value={this.state.date} onChange={this.changeDate} />
					</div>
				</div>
				<EventList events={events} date={this.state.date} />
			</div>
		);
	}
}
//rendering the eventlist component
ReactDOM.render(
	<FilterEvents />,
	document.getElementById('root')
);