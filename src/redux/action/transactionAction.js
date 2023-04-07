import Axios from "axios";
// let url = "https://rich-garb-yak.cyclic.app/";
let url = "http://localhost:2000/";

export const addCart = (id, data) => {
  return (dispatch) => {
    Axios.get(`${url}users/${id}`).then((res) => {
      let temCart = res.data.cart;
      console.log(temCart);
      temCart.push(data);
      Axios.patch(`${url}users/${id}`, { cart: temCart }).then((res) => {
        Axios.get(`${url}users/${id}`).then((res) => {
          // console.log(res.data);
          return dispatch({
            type: "Login",
            payload: res.data,
          });
        });
      });
    });
  };
};
export const onDelCart = (idUser, indexProd) => {
  return (dispatch) => {
    Axios.get(`${url}users/${idUser}`).then((res) => {
      let tempCart = res.data.cart;
      tempCart.splice(indexProd, 1);

      Axios.patch(`${url}users/${idUser}`, { cart: tempCart }).then((res) => {
        Axios.get(`${url}users/${idUser}`).then((res) => {
          return dispatch({
            type: "Login",
            payload: res.data,
          });
        });
      });
    });
  };
};

export const SaveCart = (idUser, indexProd, qtyUpdate) => {
  return (dispatch) => {
    Axios.get(`${url}users/${idUser}`).then((res) => {
      //temCart untuk menampung data cart
      let tempCart = res.data.cart;
      //temProd untuk menampung data product di cart
      let temProd = res.data.cart[indexProd];
      //mengganti qty product yg di pesan
      temProd.qty = qtyUpdate;
      //mengganti data cart dengan data qty produk yg telah di edit
      tempCart.splice(indexProd, 1, temProd);
      Axios.patch(`${url}users/${idUser}`, { cart: tempCart }).then((res) => {
        Axios.get(`${url}users/${idUser}`).then((res) => {
          return dispatch({
            type: "Login",
            payload: res.data,
          });
        });
      });
    });
  };
};

export const Checkout = (idUser, history) => {
  return (dispatch) => {
    //untuk mencatat dan mengirim data histori ke database
    Axios.post(`${url}history`, history)
      .then((res) => {
        let idUser = localStorage.getItem("idUser");

        Axios.get(`${url}history?idUser=${idUser}`).then((res) => {
          console.log(res.data);
          return dispatch({
            type: "Get_History",
            payload: res.data,
          });
        });
      })
      .then((res) => {
        // kosongkan cart user yg sedang aktif
        Axios.patch(`${url}users/${idUser}`, { cart: [] }).then((res) => {
          //update redux
          Axios.get(`${url}users/${idUser}`).then((res) => {
            return dispatch({
              type: "Login",
              payload: res.data,
            });
          });
        });
      });
  };
};

export const onHistory = () => {
  return (dispatch) => {
    let idUser = localStorage.getItem("idUser");
    Axios.get(`${url}history?idUser=${idUser}`).then((res) => {
      return dispatch({
        type: "Get_History",
        payload: res.data,
      });
    });
  };
};
