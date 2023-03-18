import React from "react";
import "./cart.css";
import { connect } from "react-redux";
import { onDelCart, SaveCart } from "../redux/action";
import { Navigate } from "react-router-dom";
import { Table, Button, Image, Form, Modal } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiDeleteOutline } from "@mdi/js";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexEdit: null,
      qty: null,
      qtyP: [false, ""],
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
    if (qty == 0) {
      this.setState({ qtyP: [true, "Please add quantity product"] });
    } else if (qty > stockProd) {
      this.setState({
        qtyP: [true, "Your order is out of stock, pleace cek again"],
      });
    }
    this.props.SaveCart(this.props.idUser, index, this.state.qty);
    this.setState({ indexEdit: null });
  };
  render() {
    if (!this.props.username) {
      return <Navigate to="/login" />;
    }
    // console.log(this.props.username);
    // console.log(this.props.idUser);

    return (
      <div className="maincontainer">
        <h1>
          Your <span>cart</span>
        </h1>
        <div className="container">
          <Table striped bordered hover variant="dark" className="table">
            {this.showImage()}
            {this.CartTable()}
          </Table>
        </div>
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
    cart: state.userReducer.cart,
    idUser: state.userReducer.id,
  };
};

export default connect(mapStateToProps, { onDelCart, SaveCart })(CartPage);
