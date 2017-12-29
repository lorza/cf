import React from "react";
import { NavLink } from "react-router-dom";
import s from "../style.js";

import AuthActions from "../Actions/AuthActions";
import AuthStore from "../Stores/AuthStore";

let style = {
  "border-bottom":"1px solid lightgrey",
}

const Navbar = () => (
  <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <span className="navbar-burger burger" data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" className="navbar-menu" style={s.nunito}>
          <div className="navbar-end">
            <a className="navbar-item" href="/play">
              Play
            </a>

            {
              AuthStore.getJwt() ? (
                <div className="navbar">
                  <a className="navbar-item">
                    {parseFloat(JSON.parse(AuthStore.getUserData()).balance).toFixed(8)} BTC
                  </a>
                  <a className="navbar-item">
                    Withdraw
                  </a>
                  <a className="navbar-item">
                    Deposit
                  </a>
                </div>
              ): null
            }

            {
              AuthStore.getJwt() ? (
                <div className="navbar-item has-dropdown is-hoverable">

                  <a className="navbar-link">
                    {JSON.parse(AuthStore.getUserData()).username}
                  </a>

                  <div className="navbar-dropdown">
                    <a className="navbar-item">
                      Settings
                    </a>
                    <a className="navbar-item" onClick={AuthActions.logoutUser}>
                      Logout
                    </a>
                  </div>

                </div>
              ) : null
            }

            <a className="navbar-item">
            FAQ
            </a>
        </div>
      </div>
    </div>
  </nav>
  //
  // <nav className="navbar" role="navigation" style={style}>
  //   <div className="container">
  //     <div className="navbar-brand">
  //       <div className="navbar-item">
  //         <h1 className="title is-4">coinfrenzy</h1>
  //       </div>
  //     </div>
  //
  //     <div className="navbar-menu">
  //       <div className="navbar-end">
  //         <div className="navbar-item">
  //           <NavLink to="/">Home</NavLink>
  //         </div>
  //
  //         <div className="navbar-item">
  //           <NavLink to="/play">Play</NavLink>
  //         </div>
  //
  //
  //
  //       </div>
  //     </div>
  //   </div>
  // </nav>
);

export default Navbar;
