import React from "react";
import "./cart.css";
import { connect } from "react-redux";
import { onDelCart, SaveCart, Checkout } from "../redux/action";
import { Navigate } from "react-router-dom";
import { Table, Button, Image, Form, Modal, InputGroup } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiDeleteOutline, mdiEyeOutline, mdiEyeOff } from "@mdi/js";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexEdit: null,
      qty: null,
      qtyP: [false, ""],
      qtyP2: [false, ""],
      confirmPass: [false, ""],
      confpassErr: [false, ""],
      visibility: false,
      tohistory: false,
    };
  }
  showImage = () => {
    return (
      <thead>
        <tr>
          <th>No</th>
          <th>Image</th>
          <th>Name Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total price</th>
          <th>Actions</th>
        </tr>
      </thead>
    );
  };

  CartTable = () => {
    return (
      <tbody>
        {this.props.cart.map((item, index) => {
          if (index === this.state.indexEdit) {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Image src={item.image} className="tableimg"></Image>
                </td>
                <td>{item.name}</td>
                <td>
                  <div className="qtyButton m-auto">
                    <Button
                      ref="plus"
                      onClick={() => this.onplus()}
                      disabled={this.state.qty >= item.stock}
                    >
                      +
                    </Button>
                    <Form.Control
                      className="form"
                      type="text"
                      placeholder="0"
                      value={this.state.qty}
                      // onChange={(e) => this.onChangeQty(e, item.stock)}
                      onChange={(e) => this.setState({ qty: +e.target.value })}
                      ref="quantity"
                    />
                    <Button
                      ref="minus"
                      onClick={() => this.onMinus()}
                      disabled={this.state.qty === 1}
                    >
                      -
                    </Button>
                  </div>
                </td>
                <td>IDR. {item.price.toLocaleString()}</td>
                <td>IDR. {(item.price * this.state.qty).toLocaleString()}</td>
                <td>
                  <Button
                    variant="dark"
                    className="me-2 "
                    onClick={() => this.onSave(index, item.stock)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="dark"
                    // className="me-2"
                    onClick={() => this.setState({ indexEdit: null })}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            );
          }
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Image src={item.image} className="tableimg"></Image>
              </td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>IDR. {item.price.toLocaleString()}</td>
              <td>IDR. {(item.price * item.qty).toLocaleString()}</td>
              <td>
                <Button
                  variant="dark"
                  className="me-2"
                  onClick={() => this.onEdit(index)}
                >
                  Edit
                </Button>
                <Button variant="dark" onClick={() => this.onDelete(index)}>
                  <Icon path={mdiDeleteOutline} size={1} />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  onDelete = (index) => {
    this.props.onDelCart(this.props.idUser, index);
  };

  onEdit = (index) => {
    this.setState({ indexEdit: index, qty: this.props.cart[index].qty });
  };
  // onChangeQty = (e, stockProd) => {
  //   let value = +e.target.value;
  //   if (value < 1) {
  //     this.setState({ qty: 1 });
  //   } else if (value > stockProd) {
  //     this.setState({ qty: stockProd });
  //   } else {
  //     this.setState({ qty: value });
  //   }
  // };
  onplus = () => {
    this.setState({ qty: this.state.qty + 1 });
  };
  onMinus = () => {
    this.setState({ qty: this.state.qty - 1 });
  };
  onSave = (index, stockProd) => {
    let qty = this.refs.quantity.value;
    if (qty === 0) {
      this.setState({
        qtyP2: [
          true,
          "Sorry minimum order for this product is one item, we will automatically add to one order item",
        ],
      });
      this.setState({ qty: 1 });
    } else if (qty > stockProd) {
      this.setState({
        qtyP2: [
          true,
          "Your order is out of stock, pleace cek again or we will automatically change it to the maximum stock",
        ],
      });
      this.setState({ qty: stockProd });
    } else if (qty > 0 && qty <= stockProd) {
      this.props.SaveCart(this.props.idUser, index, this.state.qty);
      this.setState({ indexEdit: null });
    }
    // this.props.SaveCart(this.props.idUser, index, this.state.qty);
    // this.setState({ indexEdit: null });
  };
  onCheckOut = () => {
    if (this.props.cart.length === 0) {
      this.setState({ qtyP: [true, "Your Cart is empety!"] });
    } else if (this.props.cart.length !== 0) {
      this.setState({ confirmPass: [true, "Please confirm your password"] });
    }
  };

  truePass = () => {
    // console.log(this.props.password);
    // console.log(this.refs.confirmPass.value);
    let idUser = this.props.idUser;
    if (this.props.password !== this.refs.confirmPass.value) {
      this.setState({
        confpassErr: [
          true,
          "make sure your confirm password is valid, before continue checkout",
        ],
      });
    } else if (this.props.password === this.refs.confirmPass.value) {
      this.setState({
        confpassErr: [false, ""],
      });
      // menyiapkan kerangka data yg akan di kirim
      let history = {
        idUser,
        username: this.props.username,
        time: new Date().toLocaleString(), // di kasih toLocaleString agar datenya bisa format yg bagus
        product: this.props.cart,
      };
      this.props.Checkout(idUser, history);
      this.setState({ confirmPass: [false, ""], tohistory: true });
    }
  };

  render() {
    if (!this.props.username) {
      return <Navigate to="/login" />;
    } else if (this.state.tohistory) {
      return <Navigate to="/tohistory" />;
    }
    // console.log(this.props.username);
    // console.log(this.props.idUser);

    return (
      <div className="maincontainer">
        <div className="headCart py-0">
          <h1>
            Your <span>cart</span>
          </h1>
          <Button variant="dark" className="py-0" onClick={this.onCheckOut}>
            {" "}
            Checkout
          </Button>
        </div>
        <div className="container">
          <Table striped bordered hover variant="dark" className="table">
            {this.showImage()}
            {this.CartTable()}
          </Table>
        </div>

        {/* qty protector */}
        <Modal show={this.state.qtyP[0]} className="dalmod">
          <Modal.Header>
            <Modal.Title>error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.qtyP[1]}</Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.setState({ qtyP: [false, ""] })}
              variant="danger"
              className="ButtonMod"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* onSave protector and formcontrol protector */}
        <Modal show={this.state.qtyP2[0]} className="dalmod">
          <Modal.Header>
            <Modal.Title>error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.qtyP2[1]}</Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.setState({ qtyP2: [false, ""] })}
              variant="danger"
              className="ButtonMod"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* confirm passord */}
        <Modal show={this.state.confirmPass[0]} className="dalmod">
          <Modal.Header>
            <Modal.Title>{this.state.confirmPass[1]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label htmlFor="basic-url">Password</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="basic-addon1"
                onClick={() =>
                  this.setState({ visibility: !this.state.visibility })
                }
              >
                {this.state.visibility ? (
                  <Icon path={mdiEyeOutline} size={1} />
                ) : (
                  <Icon path={mdiEyeOff} size={1} />
                )}
              </InputGroup.Text>
              <Form.Control
                placeholder="Password"
                type={this.state.visibility ? "text" : "password"}
                ref="confirmPass"
              />
            </InputGroup>
            <Form.Text className="texErr mt-0, mb-2">
              {this.state.confpassErr[0] ? this.state.confpassErr[1] : ""}
            </Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              className="ButtonMod me-2"
              onClick={this.truePass}
            >
              Confirm
            </Button>
            <Button
              onClick={() => this.setState({ confirmPass: [false, ""] })}
              variant="danger"
              className="ButtonMod"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
    cart: state.userReducer.cart,
    idUser: state.userReducer.id,
    password: state.userReducer.password,
  };
};

export default connect(mapStateToProps, { onDelCart, SaveCart, Checkout })(
  CartPage
);
