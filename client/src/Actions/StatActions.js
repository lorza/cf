import AppDispatcher from "../AppDispatcher";
import StatConstants from "../Constants/StatConstants";
import API from "../Utils/StatsAPI";

export default {
  USERCOUNT_REQUEST: () => {
    AppDispatcher.dispatch({
      actionType: StatConstants.USER_COUNT,
    })

    API.USER_COUNT();
  }
}
