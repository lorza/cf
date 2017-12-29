import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import AuthActions from "../../Actions/AuthActions";
import AuthStore from "../../Stores/AuthStore";
import StatStore from "../../Stores/StatStore";
import StatActions from "../../Actions/StatActions";

import LoginModal from "./loginModal";

import '../../App.css';
import "../../bulma.css";
import "../../animate.css";
import s from "../../style.js";

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      toggle: this.props.toggle,
      loginToggle: false,

      loginHover: false,
    };
  }

  componentWillReceiveProps(nextProp) {
    this.setState({toggle: nextProp.toggle})
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/reg", {
      username: this.state.username
    }).then(res => {
      this.setState({username: ""});
      AuthActions.loginUser(res.data.token);
      StatActions.USERCOUNT_REQUEST();
    })
  }

  render() {
    return(
      <div>
        <LoginModal toggle={this.state.loginToggle} />
        <section className={"hero is-fullheight " + (this.state.toggle == true ? null : "is-hidden")} style={s.modal}>
          <div className="hero-body">
            <div className={"modal " + (this.state.toggle == true ? "is-active" : null)}>
              <div className="modal-background" onClick={() => {
                this.setState({
                  toggle: false
                })
              }}></div>
                <div style={s.modalCard} className={"modal-card " + (this.state.toggle == true ? "animated fadeIn" : null)}>
                  {/*
                    <header className="modal-card-head">
                      <p className="modal-card-title"></p>
                      <button className="delete" aria-label="close"></button>
                    </header>
                  */}
                  <section className="modal-card-body">
                    <h1 className="title has-text-centered" style={s.modalTitle}>COINFRENZY</h1>
                    <p className="subtitle is-size-6 has-text-centered">Most trusted bitcoin jackpot EU</p>

                    <div className="columns">
                      <div className="column is-half is-offset-one-quarter">
                        <form>
                          <div className="field">
                            <div className="control">
                              <input type="text"
                                className="input"
                                placeholder="Name"
                                style={s.modalInput}
                                value={this.state.username}
                                onChange={this.handleChange}
                              />
                            </div>
                            <br />
                            <div className="control">
                              <input type="submit"
                                className="is-loading"
                                value="Join Now"
                                onClick={this.handleSubmit}
                                style={s.modalBtn}/>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <p className="heading has-text-centered">Already have an account?
                      <b onMouseEnter={() => {
                        this.setState({loginHover: true});
                      }} id="loginText" onClick={() => {
                        this.setState({loginToggle: true})
                      }}>
                        Login Here
                      </b>
                    </p>
                    <hr />
                    <p className="has-text-centered" style={s.termsSub}>By accessing the site I attest that I am at least 18 years old and have read the Terms & Conditions.</p>
                  </section>
                </div> {/*Modal Card*/}
            </div> {/*Modal*/}
          </div> {/*hero-body*/}
        </section>
      </div>
    );
  }
}

export default RegisterModal;
