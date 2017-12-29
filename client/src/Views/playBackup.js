import React from "react";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import Navbar from "../Components/Navbar";
import io from "socket.io-client";
import * as chat from "../Constants/ChatConstants";

// TESTING
import ChatBar from "../Components/chatBar";

// CSS
import "../bulma.css";
import "../css/view__play.css";

var users = require("../message.json");

// SOCKET CONSTS
// var SOCKET = io.connect("http://localhost:3002");

class PlayView extends React.Component {
  constructor(props){
      super(props);

      // CHAT FUNCTIONS
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.__ADDMESSAGE = this.__ADDMESSAGE.bind(this);

      // GAME FUNCTIONS
      this.tickGame = this.tickGame.bind(this);

      // APPLICATION STATE
      this.state = {
        // CHAT APPLICATION STATE
        CHAT__MESSAGES: [],
        CHAT__MESSAGE_INPUT: "",
        CHAT__PLAYERCOUNT: 0,

        // GAME APPLICATION STATE
        GAME__TIME: 0,
        GAME__TIMELEFT: 0,
        tickInterval: null,
        nums: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15,16,17,18,19,20],
      }
  }



  componentWillMount(){
    this.state.token = localStorage.getItem("token");
    this.forceUpdate();
  }

  // GAME FUNCTIONS
  tickGame() {
  }

  componentDidMount() {

    SOCKET.on(chat.ADD_MESSAGE, this.__ADDMESSAGE)

    // Request Round Time
    SOCKET.emit(chat.REQUEST_ROUNDTIME);

    // Handle Round Time
    SOCKET.on(chat.ROUNDTIME, (time) => {

    })

    // Request Player Count
    SOCKET.emit(chat.REQUEST_PLAYERCOUNT);

    // Handle Playercount socket response
    SOCKET.on(chat.PLAYERCOUNT, (data) => {
      // set state to variable
      let {CHAT__PLAYERCOUNT} = this.state;

      // assign data to state
      CHAT__PLAYERCOUNT = data;

      // Set new value for player count
      this.setState({CHAT__PLAYERCOUNT})
    })

  }

  // SOCKET FUNCTIONS ==================
  __ADDMESSAGE(message) {
    let {CHAT__MESSAGES} = this.state;
    
    CHAT__MESSAGES.push(message);
    this.setState({CHAT__MESSAGES});


  }
  

  // CHAT FORM HANDLING
  handleChange(e){
    this.setState({CHAT__MESSAGE_INPUT: e.target.value})    
  }

  handleSubmit(e){
    // PREVENT PAGE RELOADING
    e.preventDefault();

    // SEND NEW MESSAGE TO 'NEW MESSAGE' LISTENER

    // if chat field is empty, do not send message
    if (this.state.CHAT__MESSAGE_INPUT == "") {
      return;
    };

    // emit message event
    SOCKET.emit(chat.NEW_MESSAGE, {
      username: SOCKET.id,
      message: this.state.CHAT__MESSAGE_INPUT,
    })

    // CLEAR INPUT AFTER SUBMIT
    this.setState({CHAT__MESSAGE_INPUT: ""});
  }

  render(){

    // JSX DYNAMIC STYLE
    var timer_percentage = {
      "width": (this.state.GAME__TIMELEFT / this.state.GAME_TIME) * 100 + "%",
    }

    return(
      <div className="columns is-marginless __page">
        <ChatBar />
        {/* <div className="column is-3 is-paddingless chat__column">
          <div className="chat__header">
            <p className="has-text-centered chat__header__lang"><small>GB</small> ENGLISH</p>
          </div>
          <div className="chat__body">
            <div className="chat__body__container">
              <div className="chat__message">
                {
                  this.state.CHAT__MESSAGES.map((message) => {
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
                       value={this.state.CHAT__MESSAGE_INPUT}
                       onChange={this.handleChange}
                />

                <div className="columns is-paddingless">
                  <div className="column is-half">
                    <p className="chat__footer__count">Online: <span format="mm:ss">{this.state.CHAT__PLAYERCOUNT}</span></p>
                  </div>

                  <div className="column is-half">
                    <input type="button" className="button is-pulled-right chat__footer__sendButton" value="Send" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> */}

        <div className="column is-paddingless main">
            <Navbar />
            {/* <h1 className="title has-text-weight-bold main__r__digital_2">Roulette</h1> */}
            <div className="main__r__timebar">
              <div className="main__r__timebar__content"
                   style={timer_percentage}></div>
            </div>

            <div className="main__r__boxes">
              <div className="main__r__boxes__container">
                {
                  this.state.nums.map((box) => {
                    if(box == 0) {
                      return(
                        <div className="main__r__box __green">
                          {box}
                        </div>
                      );
                    } else if (box % 2 == 0) {
                        return(
                          <div className="main__r__box __red">
                            {box}
                          </div>
                        );
                    } else {
                        return(
                          <div className="main__r__box __black">
                            {box}
                          </div>
                        );
                    }
                  })
                }
              </div>
            </div>

            <div className="columns is-marginless">
              
              <div className="column is-one-third main__r__cols">
                <h1 className="
                  has-text-white 
                  main__r__cols__button
                  __red
                  has-text-weight-bold
                  is-size-6">1-7, Win x2</h1>

                  <div className="main__r__entries">
                    <table className="table is-fullwidth">
                      <thead>
                        <tr>
                          <td>Icon</td>
                          <td>Username</td>
                          <td>Amount</td>
                        </tr>
                      </thead>  

                      <tbody>
                        {this.state.nums.map((players, index) => {
                          return(
                            <tr>
                              <td></td>
                              <td>User#{index}</td>
                              <td>144,223</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
              </div>
            
              <div className="column is-one-third main__r__cols">
                <h1 className="
                  has-text-white
                  main__r__cols__button
                  __green
                  has-text-weight-bold
                  is-size-6">0, Win x14</h1>
              </div>

              <div className="column is-one-third main__r__cols">
                <h1 className="
                  has-text-white
                  main__r__cols__button
                  __black
                  has-text-weight-bold
                  is-size-6">8-14, Win x2</h1>
              </div>

          </div>
        </div>


      </div>    
    );
  }
}

export default PlayView;
