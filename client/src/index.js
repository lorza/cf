import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import "./bulma.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";

import App from './App';
import PlayView from "./Views/play.js";
import Navbar from "./Components/Navbar";

import AuthActions from "./Actions/AuthActions";
import AuthStore from "./Stores/AuthStore";

import registerServiceWorker from './registerServiceWorker';

axios.defaults.headers.common["Authorization"] = AuthStore.getJwt();

console.log(AuthStore.getJwt());

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }


  render() {
    return(
      <Router>
        <div>
          {/* <Navbar /> */}
          <Route exact path="/" component={App} />
          <Route path="/play" component={PlayView} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
