import AppDispatcher from "../AppDispatcher";
import * as ChatConstants from "../Constants/ChatConstants";

var ChatActions = {
    requestUsercount: () => {
        AppDispatcher.dispatch({
            actionType: ChatConstants.REQUEST_PLAYERCOUNT,
            action: null,
        })
    },

    addMessage: (message) => {
        AppDispatcher.dispatch({
            actionType: ChatConstants.ADD_MESSAGE,
            action: message,
        })
    }
}

export default ChatActions;