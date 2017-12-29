import AppDispatcher from "../AppDispatcher";
import AuthConstants from "../Constants/AuthConstants";
import StatStore from "./StatStore";
import { EventEmitter } from "events";

const CHANGE_EVENT = "change";

function setToken(token) {
  if(!localStorage.getItem("id_token")) {
    localStorage.setItem("id_token", token);
  }
}

function setUser(user) {
  if(!localStorage.getItem("userData")) {
    localStorage.setItem("userData", JSON.stringify(user));
  }

  console.log("AUTH STORE: \n", user);
}

function removeUser() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("userData");
}

class AuthStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }
  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
  isAuthenticated() {
    if(localStorage.getItem("id_token")) {
      return true
    } else {
      return false;
    }
  }
  getJwt() {
    return localStorage.getItem("id_token");
  }
  getUserData() {
    return localStorage.getItem("userData");
  }
}

const AuthStore = new AuthStoreClass();

AuthStore.dispatchToken = AppDispatcher.register(action => {
  switch(action.actionType) {
    case AuthConstants.LOGIN_USER:
      console.log("STORE/TOKEN: ", action);
      setToken(action.token)
      setUser(action.user)
      AuthStore.emit(CHANGE_EVENT);
      StatStore.emit(CHANGE_EVENT);
      break;
    case AuthConstants.LOGOUT_USER:
      removeUser();
      AuthStore.emit(CHANGE_EVENT);
      break;
  }
})

export default AuthStore;
