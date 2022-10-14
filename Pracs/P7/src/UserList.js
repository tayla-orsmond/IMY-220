//Tayla Orsmond u21467456

//importing react
import React from "react";
import ReactDOM from "react-dom";
//user component
import {User} from "./User.js";

//userlist component
//renders a list of user components using the users array
export class UserList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                {this.props.users.map((user) => {
                    return (
                        <div className="col col-6">
                            <User
                                username={user.username}
                                name={user.name}
                                surname={user.surname}
                                age={user.age}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}
