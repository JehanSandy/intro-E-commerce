import React from "react";
import {
  Navbar,
  Nav,
  Dropdown,
  Button,
  Badge,
  Offcanvas,
} from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiCartOutline, mdiMenu } from "@mdi/js";
import "./navibar.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../redux/action";

class NaviBar extends React.Component {
  render() {
    console.log(this.props.role);
    return (
      <Navbar fixed="top" className="navibar px-5 py-0 mx-auto" expand="lg">
        <Navbar.Brand href="#home" style={styles.navfont}>
          <h2>
            Buku<span style={styles.spandfont}>_coffee</span>
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={styles.navfont}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/#product" style={styles.navfont}>
              Product
            </Nav.Link>
            <Nav.Link href="#footers" style={styles.navfont}>
              Contact Us
            </Nav.Link>
          </Nav>
          {this.props.role === "admin" ? null : (
            <Button as={Link} to="/cart" variant="dark">
              <Icon path={mdiCartOutline} size={0.9} />
              <Badge bg="dark">{this.props.sumCar}</Badge>
            </Button>
          )}
          <Dropdown className="px-1">
            <Dropdown.Toggle id="dropdown-basic" variant="dark">
              {this.props.username ? this.props.username : "Username"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.props.username ? (
                <>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={
                      this.props.role === "admin"
                        ? "/historyAdmin"
                        : "/tohistory"
                    }
                  >
                    {this.props.role === "admin" ? "History Admin" : "History"}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={this.props.logOut}>
                    Log Out
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item as={Link} to="/login">
                    Login
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/register">
                    Sign Up
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

// button syle

const styles = {
  navibar: {
    backgroundColor: "rgba(1, 1, 1, 0.8)",
    padding: "0",
    borderBottom: "1px solid rgb(81, 60, 40)",
  },
  navfont: {
    color: "rgba(255, 255, 255)",
    marginTop: "0",
    marginBottom: "0",
  },
  spandfont: {
    color: "rgba(182, 137, 91)",
    marginTop: "0",
    marginBottom: "0",
  },
};

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
    sumCar: state.userReducer.cart.length,
    role: state.userReducer.role,
  };
};

export default connect(mapStateToProps, { logOut })(NaviBar);
