import Axios from "axios";

export const Login = (username, password) => {
  return (dispatch) => {
    Axios.get(
      `http://localhost:2000/users?username=${username}&password=${password}`
    ).then((res) => {
      if (res.data.length === 0) {
        return dispatch({
          type: "errorLogin",
        });
      } else {
        return dispatch({
          type: "Login",
          payload: res.data[0], //untuk mengirim objeknya saja
        });
      }
    });
    // alert("selamat kamu sudah login");
  };
};
export const errorLoginFalse = () => {
  return (dispatch) => {
    return dispatch({
      type: "errorLoginFalse",
    });
  };
};
