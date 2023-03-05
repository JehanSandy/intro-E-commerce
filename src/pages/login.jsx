import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiEyeOutline, mdiEyeOff } from "@mdi/js";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
  }
  render() {
    return (
      <div style={styles.cont}>
        <div style={styles.contForm}>
          <h1>Hallo</h1>
          <h3 className="mb-4">Welcome Back!</h3>
          <Form.Label htmlFor="basic-url">Username</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <Icon path={mdiAccountCircle} size={1} />
            </InputGroup.Text>
            <Form.Control placeholder="Username" />
          </InputGroup>

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
            />
          </InputGroup>
          <div style={styles.contBtn}>
            <Button variant="primary" style={styles.btn}>
              Login
            </Button>
            <h3 style={styles.font}>
              <b>
                Don't have an account? <Link to="/register">Sign In</Link>
              </b>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  cont: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1490168105446-f43395eb50b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80)",
    backgroundPosition: "10% 50%",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contForm: {
    marginTop: "10vh",
    width: "30vw",
    height: "66vh",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: "4vh",
    borderRadius: "2vh",
  },
  contBtn: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
  },
  btn: {
    width: "5vw",
  },
  font: {
    fontSize: "1.2rem",
    marginTop: "1.5vh",
  },
};

export default LoginPage;
