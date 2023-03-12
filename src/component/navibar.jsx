import React from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../redux/action";

class NaviBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inHover: false,
      inHovcart: false,
    };
  }
  handleMouseEnter = () => {
    this.setState({ inHover: true });
  };

  handleMouseLeave = () => {
    this.setState({ inHover: false });
  };

  handleCartEnter = () => {
    this.setState({ inHovcart: true });
  };

  handleCartLeave = () => {
    this.setState({ inHovcart: false });
  };

  render() {
    const { inHover, inHovcart } = this.state;
    const button = {
      border: inHover ? "rgba(182, 137, 91)" : "1px solid rgba(255, 255, 255)",
      backgroundColor: inHover ? "rgba(182, 137, 91)" : "rgba(1, 1, 1, 0.90)",
      marginLeft: inHover ? "10px" : "10px",
      transition: "0.3s ease-in-out",
    };
    const buttoncart = {
      border: inHovcart
        ? "rgba(182, 137, 91)"
        : "1px solid rgba(255, 255, 255)",
      backgroundColor: inHovcart ? "rgba(182, 137, 91)" : "rgba(1, 1, 1, 0.90)",
      marginLeft: inHovcart ? "10px" : "10px",
      transition: "0.3s ease-in-out",
    };

    return (
      <Navbar
        fixed="top"
        className="px-5 py-0 mx-auto"
        style={styles.navibar}
        expand="lg"
      >
        <Navbar.Brand href="#home" style={styles.navfont}>
          <h1>
            Buku<span style={styles.spandfont}>_coffee</span>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" style={styles.navfont}>
              Home
            </Nav.Link>
            <Nav.Link href="#link" style={styles.navfont}>
              Product
            </Nav.Link>
            <Nav.Link href="#link" style={styles.navfont}>
              Contact Us
            </Nav.Link>
          </Nav>
          <Button
            style={buttoncart}
            onMouseEnter={this.handleCartEnter}
            onMouseLeave={this.handleCartLeave}
          >
            <Icon path={mdiCartOutline} size={0.9} />
          </Button>{" "}
          <Dropdown className="px-1">
            <Dropdown.Toggle
              style={button}
              onMouseEnter={this.handleMouseEnter}
              id="dropdown-basic"
            >
              {this.props.username ? this.props.username : "Username"}
            </Dropdown.Toggle>

            <Dropdown.Menu show={inHover} onMouseLeave={this.handleMouseLeave}>
              {this.props.username ? (
                <>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item>History</Dropdown.Item>
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
                    Sign In
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
  image: {
    height: "40px",
  },
};

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
  };
};

export default connect(mapStateToProps, { logOut })(NaviBar);
