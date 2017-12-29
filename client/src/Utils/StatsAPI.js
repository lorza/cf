import axios from "axios";
import StatServerActions from "../Actions/StatServerActions";

export default {
  USER_COUNT: () => {
    axios.get("/stats/registered_players")
      .then(response => {
        StatServerActions.USERCOUNT_RECIEVE(response.data);
      })
  }
}
