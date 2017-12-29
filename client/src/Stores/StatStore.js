import AppDispatcher from "../AppDispatcher";
import axios from "axios";
// import StatActions from "../Actions/StatActions";
import StatConstants from "../Constants/StatConstants";
import { EventEmitter } from "events";

const CHANGE_EVENT = "change";

let _store = {
  USER_COUNT: 0
}

class StatStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }
  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getAll() {
    return _store;
  }
}

const StatStore = new StatStoreClass();

StatStore.dispatchToken = AppDispatcher.register(payload => {
  switch(payload.actionType) {
    case StatConstants.USER_COUNT_RESPONSE:
      _store.USER_COUNT = payload.response.count
      StatStore.emitChange();
  }
  })

export default StatStore
