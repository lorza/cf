import React from "react";
import axios from "axios";

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      match: null,
    }
  }

  handleUserChange = (event) => {
    this.setState({username: event.target.value});
    this.checkUser(event.target.value);
  }

  handlePassChange = (event) => {
    this.setState({password: event.target.value});
  }

  checkUser = (user) => {
    axios.post("/api/usercheck", {
      username: user
    }).then(response => {
      let data = response.data;

      if(data.match == false) {
        this.setState({
          match: false
        })
      } else {
        this.setState({
          match: true
        })
      }
    })

    if(this.state.username == "") {
      this.setState({
        match: null
      })
    }
  }

  submitForm = () => {
    axios.post("/api/register", {
      username: this.state.username,
      password: this.state.password,
    }).then(response => {
      console.log(response.data);
      this.setState({user: response.data});
    }).catch(err => {
      console.log("There was an error: ", err);
    })

    this.setState({
      username: "",
      password: "",
    })
  }

  render() {
    return(
      <div className="container">
        <h1 className="title">Register</h1>
        <hr />
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" value={this.state.username} onChange={this.handleUserChange.bind(this)} />
            {
              this.state.match === false ? (
                <p className="help is-success">This username is available</p>
              )
              :
              this.state.match === true ? (
                <p className="help is-danger">This username is taken</p>
              )
              :
              null
            }
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" value={this.state.password} onChange={this.handlePassChange.bind(this)} />
          </div>
        </div>

        <button className="button" onClick={this.submitForm}>Register</button>
      </div>
    );
  }
}

export default RegisterForm;
