//Tayla Orsmond u21467456

//UsernamePasswordInput component
//This component is used to display the username and password input fields (bootstrap styling)

class UsernamePasswordInput extends React.Component {
    constructor(props) {
        super(props);
        this.checkUsername = this.checkUsername.bind(this);
        this.checkPass = this.checkPass.bind(this);
        this.userInput = React.createRef();
        this.passInput = React.createRef();
    }
    checkUsername = () => {
        //username must be at least 3 characters long, and start with a capital letter and have no special characters
        let re = /^[A-Z][a-z]{2,}$/;
        if(re.test(this.userInput.current.value)){
            this.props.validateUsername(true);
            //set the class of the input to be valid
            this.userInput.current.className = "form-control is-valid";
        } else {
            this.props.validateUsername(false);
            //set the class of the input to be invalid
            this.userInput.current.className = "form-control is-invalid";
        }
    }
    checkPass = () => {
        //password must be at least 8 characters long, and contain at least one number and one capital letter
        let re = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        if(re.test(this.passInput.current.value)){
            this.props.validatePass(true);
            //set the class of the input to be valid
            this.passInput.current.className = "form-control is-valid";
        } else {
            this.props.validatePass(false);
            //set the class of the input to be invalid
            this.passInput.current.className = "form-control is-invalid";
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="mySuperUsername" ref={this.userInput} onChange={this.checkUsername} validateUsername={this.props.validateUsername}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="text" className="form-control" id="password" placeholder="mySuperPassword" ref={this.passInput} onChange={this.checkPass} validatePass={this.props.validatePass}/>
                </div>
            </React.Fragment>
        );
    }
}

//LoginForm component
//This component is used to display the login form (bootstrap styling)
//It contains the UsernamePasswordInput component

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vPass: false,
            vUser: false,
        };
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePass = this.validatePass.bind(this);
    }
    validateUsername = (state) => {
        this.setState({vUser: state});
    }
    validatePass = (state) => {
        this.setState({vPass: state});
    }
    render() {
        return (
            <form onSubmit={this.props.login}>
                <UsernamePasswordInput validateUsername={this.validateUsername} validatePass={this.validatePass}/>
                <button type="submit" className="btn btn-primary" disabled={!(this.state.vUser && this.state.vPass)}>Submit</button>
            </form>
        );
    }
}

//ProfilePage component
//This component is used to display the profile page (bootstrap styling)

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container-fluid">
                <h1 className="display-4 my-3">Welcome {this.props.username}!</h1>
                <button className="btn btn-light" onClick={this.props.logout}>Logout</button>
            </div>
        );
    }
}

//View component
//This component is used to display the login form or profile page depending on the state of the application

class ViewPort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            loggedIn: false
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    login = (e) => {
        e.preventDefault();
        this.setState({loggedIn: true, username: document.getElementById('username').value});
    }
    logout = () => {
        this.setState({loggedIn: false, username: ''});
    }
    render() {
        return (
            <div className="container-fluid p-5">
                {this.state.loggedIn ? <ProfilePage username={this.state.username} logout={this.logout}/> : <LoginForm login={this.login}/>}
            </div>
        );
    }
}

ReactDOM.render(<ViewPort/>, document.getElementById('main'));


