const INITIAL_STATE = {
  id: null,
  username: "",
  password: "",
  role: "",
  errorLogin: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        password: action.payload.password,
        role: action.payload.role,
      };
    case "errorLogin":
      return {
        ...state,
        errorLogin: true,
      };
    case "errorLoginFalse":
      return {
        ...state,
        errorLogin: false,
      };
    default:
      return state;
  }
};

export default userReducer;
