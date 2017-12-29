import AppDispatcher from "../AppDispatcher";
import AuthConstants from "../Constants/AuthConstants";

export default {
  loginUser: (token, user) => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_USER,
      token: token,
      user: user
    })
  },

  logoutUser: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_USER
    })
  }
}
