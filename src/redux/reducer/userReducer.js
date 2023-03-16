const INITIAL_STATE = {
  id: null,
  username: "",
  password: "",
  role: "",
  cart: [],
  errorLogin: false,
  regisErr: [false, ""],
  regisSuccess: false,
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
        cart: [],
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
    case "logOut":
      return INITIAL_STATE;
    case "Username_Email_exist":
      return {
        ...state,
        regisErr: [true, "Username or Email already exist"],
      };
    case "SignIn_false":
      return {
        ...state,
        regisErr: [false, ""],
      };
    case "SuccessRegis":
      return {
        ...state,
        regisSuccess: true,
      };
    default:
      return state;
  }
};

export default userReducer;
