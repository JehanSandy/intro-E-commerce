const INITIAL_STATE = {
  history: [],
};

const historiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "Get_History":
      return {
        history: action.payload,
      };
    default:
      return state;
  }
};

export default historiReducer;
