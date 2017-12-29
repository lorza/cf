import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import AuthActions from "../../Actions/AuthActions";
import AuthStore from "../../Stores/AuthStore";
import StatStore from "../../Stores/StatStore";
import StatActions from "../../Actions/StatActions";

import LoginForm from "../loginForm";

import '../../App.css';
import "../../bulma.css";
import "../../animate.css";
import s from "../../style.js";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: this.props.loginToggle
    }
  }

  componentWillReceiveProps(nextProp) {
    this.setState({toggle: nextProp.toggle})
  }

  render() {
    return(
      <section className={"hero is-fullheight " + (this.state.toggle == true ? null : "is-hidden")} style={s.modalFull}>
        <div className="hero-body">
          <div className={"modal " + (this.state.toggle == true ? "is-active" : null)}>
            <div className="modal-background" style={s.modalBG} onClick={() => {
              this.setState({toggle: false});
            }}></div>
              <div style={s.modalCard} className={"modal-card " + (this.state.toggle == true ? "aniamted fadeIn" : null)}>
                <section className="modal-card-body">
                  <h1 className="title has-text-centered" style={s.modalTitle}>LOGIN</h1>
                  <p className="subtitle is-size-6 has-text-centered">Most trusted bitcoin jackpot EU</p>

                  <div className="columns">
                    <div className="column is-half is-offset-one-quarter">
                      <LoginForm />
                    </div>
                  </div>
                  <hr />
                  <p className="has-text-centered" style={s.termsSub}>By accessing the site I attest that I am at least 18 years old and have read the Terms & Conditions.</p>
                </section>
              </div> {/*Modal Card*/}
          </div> {/*Modal*/}
        </div> {/*hero-body*/}
      </section>
    );
  }
}

export default LoginModal;
