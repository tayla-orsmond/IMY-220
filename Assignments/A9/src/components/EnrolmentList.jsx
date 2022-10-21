//Tayla Orsmond u21467456

import React from 'react';

//the EnrolmentList component is used to display the list of courses in a bootstrap dropdown list
//the list is populated by the courses in the courses array

class EnrolmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.queryDB = this.queryDB.bind(this);
    }

    queryDB(e) {
        //get the course code from the data-key attribute of the link that was clicked
        let code = e.target.getAttribute('data-key');
        this.props.socket.emit('enrollment', code);
        console.log('querying db for course ' + code);
        this.props.socket.on('users', (users) => {
            //when the server responds with the list of users, update the state
            console.log(users);
            this.setState({users: users});
        });
    }

    render() {
        return (
            <div className='container'>
                <h1>Select the Course name to view the students enrolled</h1>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Courses <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.props.classes.map(({name, code}, index) => {
                            return (
                                <li key={index} className="p-2">
                                    <a href="#" onClick={this.queryDB} data-key={code}>{name}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>{
                    this.state.users.map(({name, surname, id}, index) => {
                        return (
                            <div key={index}>
                                <p>{name} {surname} {id}</p>
                            </div>
                        );
                    })
                }</div>
            </div>
        );
    }
}

export default EnrolmentList;