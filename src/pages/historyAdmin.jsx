import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import { Accordion, Table, Image } from "react-bootstrap";
let url = "http://localhost:2000/";

class HistoriAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  componentDidMount() {
    Axios.get(`${url}history`).then((res) => {
      return this.setState({ history: res.data });
    });
  }
  render() {
    if (!this.props.username) {
      return <Navigate to="/login" />;
    }
    console.log(this.props.username);
    return (
      <div className="maincontainer">
        <div className="headCart py-0">
          <h1>history page</h1>
        </div>
        <div>
          <Accordion alwaysOpen>
            {this.state.history.reverse().map((item, index) => {
              return (
                <Accordion.Item eventKey={index.toString()}>
                  <Accordion.Header>
                    {item.username} Time transaction {item.time}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Image</th>
                          <th>Name Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.product.map((item, index2) => {
                          return (
                            <tr key={index2}>
                              <td>{index2 + 1}</td>
                              <td>
                                <Image
                                  src={item.image}
                                  className="tableimg"
                                ></Image>
                              </td>
                              <td>{item.name}</td>
                              <td>IDR. {item.price.toLocaleString()}</td>
                              <td>{item.qty}</td>
                              <td>
                                IDR. {(item.price * item.qty).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
  };
};

export default connect(mapStateToProps)(HistoriAdmin);
// export default HistoriAdmin;
