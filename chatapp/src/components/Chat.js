import React from "react";
import io from "socket.io-client";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            username: '',
            message: '',
            messages: []
        };


        this.socket = io('localhost:8080');

        this.sendMessage = () => {
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({ message: '' });
        };

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, data] });
        };
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    componentDidMount() {
        this.setState({
            username: localStorage.getItem('username')
        })
        // checking if user is logged in
        if ((localStorage.getItem('username') == null) || (localStorage.getItem('username').length < 4)) {
            this.props.history.push({
                pathname: '/'
            });
        }
    }

    addEmoji = (e) => {
        console.log(e)
        if (e.unified.length <= 5) {
            let emojiPic = String.fromCodePoint(`0x${e.unified}`)
            this.setState({
                message: this.state.message + emojiPic
            })
        } else {
            let sym = e.unified.split('-')
            let codesArray = []
            sym.forEach(el => codesArray.push('0x' + el))
            //console.log(codesArray.length)
            //console.log(codesArray)  // ["0x1f3f3", "0xfe0f"]
            let emojiPic = String.fromCodePoint(...codesArray)
            this.setState({
                message: this.state.message + emojiPic
            })
        }
    }

    logout() {
        localStorage.removeItem('username');
        this.props.history.push({
            pathname: '/'
        });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-body">
                                <div className="card-header text-center">Chat</div>
                                <div className="card-title">Your name: {this.state.username}  </div>
                                <button onClick={this.logout} className="btn btn-outline-primary">Logout</button>
                                <hr />
                                <div className="messages">
                                    {this.state.messages.map((message, i) => {
                                        return (
                                            <div key={i}>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>
                                <div className="footer">
                                    <input type="text" onKeyPress={this.handleKeyPress} placeholder="Message" className="form-control" value={this.state.message} onChange={this.handleChange} />
                                    <br />
                                    <Picker onSelect={this.addEmoji} />
                                    <br />
                                    <button onClick={this.sendMessage} className="btn btn-primary form-control mt-3">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;