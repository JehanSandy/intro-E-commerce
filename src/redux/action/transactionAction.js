import { type } from "@testing-library/user-event/dist/type";
import Axios from "axios";
let url = "http://localhost:2000/";

export const checkout = (id, data) => {
  return (dispatch) => {
    Axios.get(`${url}users/${id}`).then((res) => {
      let temCart = res.data.cart;
      temCart.push(data);
      Axios.patch(`${url}users/${id}`, { cart: temCart }).then((res) => {
        Axios.get(`${url}users/${id}`).then((res) => {
          return dispatch({
            type: "Login",
            payload: res.data,
          });
        });
      });
    });
  };
};
