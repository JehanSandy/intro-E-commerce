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
        localStorage.setItem("idUser", res.data[0].id);
        return dispatch({
          type: "Login",
          payload: res.data[0], //untuk mengirim objeknya saja
        });
      }
    });
  };
};
export const errorLoginFalse = () => {
  return (dispatch) => {
    return dispatch({
      type: "errorLoginFalse",
    });
  };
};

export const logOut = () => {
  return (dispatch) => {
    localStorage.removeItem("idUser");
    return dispatch({
      type: "logOut",
    });
  };
};

export const keepLogin = (id) => {
  return (dispatch) => {
    Axios.get(`http://localhost:2000/users/${id}`).then((res) => {
      return dispatch({
        type: "Login",
        payload: res.data,
      });
    });
  };
};

export const SignIn = (username, email, data) => {
  return (dispatch) => {
    Axios.get(`http://localhost:2000/users?username=${username}`).then(
      (res) => {
        if (res.data.length !== 0) {
          return dispatch({
            type: "Username_Email_exist",
          });
        }
        Axios.get(`http://localhost:2000/users?email=${email}`).then((res) => {
          if (res.data.length !== 0) {
            return dispatch({
              type: "Username_Email_exist",
            });
          }
          Axios.post(`http://localhost:2000/users`, data).then((res) => {
            return dispatch({
              type: "SuccessRegis",
            });
          });
        });
      }
    );
  };
};

export const SignInFalse = () => {
  return (dispatch) => {
    return dispatch({
      type: "SignIn_false",
    });
  };
};
