import React from "react";
import 'emoji-mart/css/emoji-mart.css';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.confirmUsername = this.confirmUsername.bind(this);

        this.state = {
            username: ''
        };

    }


    handleChange(event) {
        this.setState({ username: event.target.value });
    }


    confirmUsername(event) {
        if (this.state.username.length > 3) {
            localStorage.setItem('username', this.state.username);
            this.props.history.push({
                pathname: '/chat',
                state: {
                    username: this.state.username
                }
            });
        } else {
            alert("Minimum 4 characters required");
        }
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-body">
                                <div className="footer">
                                    <span>Provide your username:</span>
                                    <br />
                                    <input type="text"  minlength={4} placeholder="Username" className="form-control" value={this.state.username} onChange={this.handleChange}/>
                                    <br />
                                    <button onClick={this.confirmUsername} className="btn btn-primary form-control">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;