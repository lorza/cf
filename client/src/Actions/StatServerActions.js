import AppDispatcher from "../AppDispatcher";
import StatConstants from "../Constants/StatConstants";

export default {
  USERCOUNT_RECIEVE: (res) => {
    AppDispatcher.dispatch({
      actionType: StatConstants.USER_COUNT_RESPONSE,
      response: res,
    })
  }
}
