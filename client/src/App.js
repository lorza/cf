import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import './App.css';
import "./bulma.css";
import "./animate.css";
import s from "./style.js";

// COMPONENTS
import RegisterForm from "./Components/registerForm"
import LoginForm from "./Components/loginForm";
import Navbar from "./Components/Navbar";
import RegisterModal from "./Components/Landing/registerModal";

// ACTIONS AND STORES
import AuthActions from "./Actions/AuthActions";
import AuthStore from "./Stores/AuthStore";
import StatStore from "./Stores/StatStore";
import StatActions from "./Actions/StatActions";


const CHANGE_EVENT = "change";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: AuthStore.getJwt(),
      user: AuthStore.getUserData(),
      registerModalToggle: false,
      playerCount: null,
    }
  }

  componentWillMount(){
    AuthStore.on(CHANGE_EVENT, () => {
      this.setState({
        token: AuthStore.getJwt(),
        // user: AuthStore.getUserData(),
      })
    })

    StatStore.on(CHANGE_EVENT, () => {
      this.setState({
        playerCount: StatStore.getAll().USER_COUNT
      })
    });

    StatActions.USERCOUNT_REQUEST();
  }


  render() {


    return (
      <div>
      {/*<section className="is-fullheight" style={s.beta}>
        <div className="container">
          <h1 className="title" style={s.beta}>PRE-ALPHA</h1>
        </div>
      </section> */}

      {/*MODAL MAIN*/}
      {/* The button used to toggle this modal is outside of the modal component - So you need to pass the toggle down as a prop */}
      <RegisterModal toggle={this.state.registerModalToggle}/>

      <section className="hero is-fullheight" style={s.hero}>
          <Navbar />
          <div className="hero-body">
            <div className="container">
              <h1 className="title" style={s.title}>coinfrenzy </h1>
              <h2 className="subtitle" style={s.sub}>A Bitcoin Jackpot Site - Simple, Elegant And Fair</h2>
              {/*REMOVE OUTLINE ON FOCUS AFTER CLICK*/}
              <button className="" style={s.btn} onClick={() => {
                this.setState({
                  registerModalToggle: true
                })
              }}>Play</button>

              <br /> <br />

              <div className="columns">
                <div className="column is-5">
                  <div className="columns">
                    <div className="column is-one-third">
                      <p className="heading">Users Registered</p>
                      <p className="title">{this.state.playerCount}</p>
                    </div>

                    <div className="column is-one-third">
                      <p className="heading">Bitcoin Gambled</p>
                      <p className="title">14.5301</p>
                    </div>

                    <div className="column is-one-third">
                      <p className="heading">Won In The Last 24 Hr</p>
                      <p className="title">$153K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-half">
                  <h1 className="title">Simple and Elegant</h1>
                  <p className="content" style={s.nunito}>
                    Coinfrenzy is a beautiful and meticulously crafted
                    plaform for both avid cryptographers and gamblers
                    alike. We offer a fun and exhilarating way to play with
                    your coins, offering you the chance to win big!
                  </p>

                  <h1 className="title">Games</h1>
                  <p className="content" style={s.nunito}>
                    Coinfrenzy is a beautiful and meticulously crafted
                    plaform for both avid cryptographers and gamblers
                    alike. We offer a fun and exhilarating way to play with
                    your coins, offering you the chance to win big!
                  </p>

                  <h1 className="title">Fair</h1>
                  <p className="content" style={s.nunito}>
                    Behind all our games is a provably fair mixed with our
                    own litte Coinfrenzy twist. This is to ensure that each round
                    played, is completely random and fair. We allow for
                    every single round to be checked against our database
                    to guarentee its validity. We understand that despite the use
                    of a provably fair, there will still be doubt. The era of
                    "so I found this new site" and "%?" is behind us. Coinfrezny
                    offers a truly fair platform and we promise you can play and
                    gamble at ease. If you would like to know more about our system
                    refer to our Fairness page
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/*
        <pre>{this.state.token}</pre>
        <br />
        <RegisterForm />
        <br />
        <LoginForm />
      */}

      </div>
    );
  }
}

export default App;
