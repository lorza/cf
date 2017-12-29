import React from "react";
import * as chat from "../Constants/ChatConstants";
import ChatActions from "../Actions/ChatActions";
import ChatStore from "../Stores/ChatStore";

import io from "socket.io-client";
import "../bulma.css";
import "../css/view__play.css";

import * as uid from "uniqid";
var change_event = "change_event";

class ChatBar extends React.Component {
    constructor(props) {
        super(props);
        // CHAT FUNCTIONS
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._onChange = this._onChange.bind(this); 

        this.state = {
            chat__messages: ChatStore.getMessages(),
            chat__playercount: 0,
            chat__message_input: "",
        };
    }

    _onChange() {
        console.log("Client heard store change");
        console.log(ChatStore.getMessages()); 
    }

    componentWillMount() {
        ChatStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
        ChatStore.on(change_event, this._onChange);
        
        // Request Playercount
        this.setState({chat__playercount: ChatStore.getPlayercount()});
    }

    componentWillUnmount() {
        ChatStore.removeAllListeners(this._onChange);
    }

    handleChange(e) {
        this.setState({chat__message_input: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.chat__message_input == "") {
            return;
        }

        ChatActions.addMessage({
            username: "username",
            message: this.state.chat__message_input,
            message_id: uid("msg-"),
        })

        // clear input after submit
        this.setState({chat__message_input: ""})
    }

    render() {
        return(
        <div className="column is-3 is-paddingless chat__column">
          <div className="chat__header">
            <p className="has-text-centered chat__header__lang"><small>GB</small> ENGLISH</p>
          </div>
          <div className="chat__body">
            <div className="chat__body__container">
              <div className="chat__message">
                {
                  this.state.chat__messages.map((message) => {
                    return(
                      <div>
                        <p>{message.username}</p>
                        <small>{message.message}</small>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
          <div className="chat__footer">
            <div className="chat__footer__content">
              <form onSubmit={this.handleSubmit}>
                <input className="input" 
                       type="text" 
                       placeholder="Type a message..." 
                       value={this.state.chat__message_input}
                       onChange={this.handleChange}
                />

                <div className="columns is-paddingless">
                  <div className="column is-half">
                    <p className="chat__footer__count">Online: <span format="mm:ss">{this.state.chat__playercount}</span></p>
                  </div>

                  <div className="column is-half">
                    <input type="button" className="button is-pulled-right chat__footer__sendButton" value="Send" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        );
    }
}

export default ChatBar;