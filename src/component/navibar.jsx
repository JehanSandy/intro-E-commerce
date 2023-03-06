import React from "react";
import { Navbar, Nav, Dropdown, Button, Image } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";
import { LOGO } from "../assets/index";
import { Link } from "react-router-dom";

class NaviBar extends React.Component {
  render() {
    return (
      <Navbar fixed="top" className="px-5" style={styles.navibar} expand="lg">
        <Navbar.Brand href="#home" style={styles.navfont}>
          <Image src={LOGO} style={styles.image} />
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
          <Button variant="outline-light">
            <Icon path={mdiCartOutline} size={0.9} />
          </Button>{" "}
          <Dropdown style={{ marginLeft: "10px" }} className="px-1">
            <Dropdown.Toggle style={styles.btn} id="dropdown-basic">
              Username
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/login">
                Login
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/register">
                Sign In
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const styles = {
  navibar: {
    // backgroundColor: "rgba(0, 25, 112, 0.7)",
  },
  btn: {
    border: "none",
    backgroundColor: "#5343bae",
  },
  navfont: {
    color: "#ffffff",
  },
  image: {
    height: "40px",
  },
};

export default NaviBar;
