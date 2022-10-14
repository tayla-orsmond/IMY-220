//Tayla Orsmond u21467456

//importing react
import React from "react";
import ReactDOM from "react-dom";

//user component
//renders a bootstrap card header with the user's username
//renders a bootstrap card body with the user's name, surname and age
export class User extends React.Component {
    constructor(props) {
        super(props);
        this.toggleInfo = this.toggleInfo.bind(this);
        this.state = {
            showInfo: false
        };
    }
    toggleInfo() {
        this.setState({
            showInfo: !this.state.showInfo
        });
    }
    render() {
        return (
            <div className="card">
                <div className="card-header" onClick={this.toggleInfo}>
                    {this.props.username}
                </div>
                <div className="card-body" style={{ display: this.state.showInfo ? "block" : "none" }}>
                    <p className="card-text">{this.props.name}</p>
                    <p className="card-text">{this.props.surname}</p>
                    <p className="card-text">{this.props.age}</p>
                </div>
            </div>
        );
    }
}