import React from "react";
import "./detailPage.css";
import Axios from "axios";
import { Button, Form, Carousel, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { checkout } from "../redux/action";
import { Navigate } from "react-router-dom";
const url = "http://localhost:2000/";

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      qty: 0,
      qtyProct: [false, ""],
      onLogin: false,
    };
  }

  onplus = () => {
    this.setState({ qty: this.state.qty + 1 });
  };
  onMinus = () => {
    this.setState({ qty: this.state.qty - 1 });
  };

  oncheckOut = () => {
    let qty = +this.refs.quantity.value;
    let username = this.props.username;
    let id = this.props.id;
    const { products } = this.state;
    if (qty == 0) {
      return this.setState({ qtyProct: [true, "Please add quantity product"] });
    } else if (qty > this.state.products.stock) {
      return this.setState({
        qtyProct: [true, "Your order is out of stock, pleace cek again"],
      });
    } else if (!username) {
      return this.setState({
        qtyProct: [true, "Please login to continues transaction"],
      });
    }
    let obj = {
      id: products.id,
      name: products.name,
      image: products.images[0],
      price: products.price,
      stock: products.stock,
      qty,
    };
    // console.log(obj);
    this.props.checkout(id, obj);
  };

  onlogin = () => {
    let username = this.props.username;
    if (!username) {
      return this.setState({ onLogin: true });
    }
  };

  componentDidMount() {
    Axios.get(`${url}products/${document.location.search.substring(1)}`).then(
      (res) => {
        this.setState({ products: res.data });
      }
    );
  }
  render() {
    const { products, qty, qtyProct, onLogin } = this.state;
    if (onLogin) {
      return <Navigate to="/login" />;
    }
    // console.log(this.state.products);
    // console.log(this.props.username);
    return (
      <div className="mainContainer">
        <div className="showProduct">
          <div className="CartCekOut">
            <Carousel>
              {(products.images ? products.images : []).map((item, index) => {
                return (
                  <Carousel.Item key="index">
                    <img className="imgShow" src={item} alt="First slide" />
                    <Carousel.Caption className="CarCap">
                      <h3>{products.imageDes[index]}</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>

        {/* Description */}
        <div className="showDescription">
          <h1>{products.name}</h1>
          <h2>Rp. {products.price}</h2>
          <p>{products.description}</p>
        </div>

        {/* cekOut Detail */}
        <div className="showCekOut">
          <div className="CartCekOut">
            <div className="titleCekOut">
              <h2>
                {" "}
                <b>Category "{products.category}"</b>
              </h2>
            </div>
            <div className="subtitleCekOut">
              <h2>
                {" "}
                <b>Set quantity and notes</b>{" "}
              </h2>
              <div className="mainQty">
                <div className="qtyButton">
                  <Button
                    ref="plus"
                    onClick={() => this.onplus()}
                    disabled={qty >= products.stock}
                  >
                    +
                  </Button>
                  <Form.Control
                    className="form"
                    type="text"
                    placeholder="0"
                    value={qty}
                    onChange={(e) => this.setState({ qty: +e.target.value })}
                    ref="quantity"
                  />
                  <Button
                    ref="minus"
                    onClick={() => this.onMinus()}
                    disabled={qty === 0}
                  >
                    -
                  </Button>
                </div>
                <p>Stock Product: {products.stock}</p>
              </div>
            </div>
            <div className="total">
              <p>Sub Total :</p>
              <p>Rp. {(qty * products.price).toLocaleString()}</p>
            </div>
            <div className="Note">
              <p>Notes :</p>
              <Form.Control
                className="formNote"
                type="text"
                placeholder="add note for your request"
              />
            </div>
            <div className="buyButton">
              <Button onClick={this.oncheckOut}>add to card</Button>
              <Button>Buy Now</Button>
            </div>
          </div>
          <Modal show={qtyProct[0]} className="dalmod">
            <Modal.Header>
              <Modal.Title>error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{qtyProct[1]}</Modal.Body>
            <Modal.Footer>
              {!this.props.username ? (
                <Button
                  onClick={() => this.onlogin()}
                  variant="success"
                  className="ButtonMod"
                >
                  Go to Login
                </Button>
              ) : (
                ""
              )}
              <Button
                onClick={() => this.setState({ qtyProct: [false, ""] })}
                variant="danger"
                className="ButtonMod"
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
    id: state.userReducer.id,
    userCart: state.userReducer.cart,
  };
};

export default connect(mapStateToProps, { checkout })(DetailPage);
