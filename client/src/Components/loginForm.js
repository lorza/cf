import React from "react";
import axios from "axios";
import AuthActions from "../Actions/AuthActions";
import AuthStore from "../Stores/AuthStore";
import s from "../style";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: null,
    }
  }

  handleUserChange = (event) => {
    this.setState({username: event.target.value});
  }

  handlePassChange = (event) => {
    this.setState({password: event.target.value});
  }

  submitForm = (e) => {
    e.preventDefault();
    axios.post("/api/auth", {
      username: this.state.username,
      password: this.state.password,
    }).then(response => {
      console.log(response);

      if (response.data.success === false)
      {
        console.log("Authentication Failed. Invalid Credentials");
        alert("Authentication Failed. Invalid Credentials");
      }
      else
      {
        console.log("RESPONSE FROM API: \n", response.data.user)
        AuthActions.loginUser(response.data.token, response.data.user)
        this.setState({message: response.data.message})
        alert("Authentication Successful");
      }
    })

    this.setState({
      username: "",
      password: "",
    })
  }

  render() {
    return(
      <div>
        <form>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input"
                     style={s.modalInput}
                     type="text"
                     value={this.state.username}
                     onChange={this.handleUserChange.bind(this)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input"
                     type="password"
                     value={this.state.password}
                     onChange={this.handlePassChange.bind(this)}
                     style={s.modalInput}
              />
            </div>
          </div>

          <button className=""
                  style={s.modalBtn}
                  onClick={this.submitForm}>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
