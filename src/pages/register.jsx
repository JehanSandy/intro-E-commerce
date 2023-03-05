import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiEyeOutline, mdiEyeOff } from "@mdi/js";

class Register extends React.Component {
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
          <h1>Sign In</h1>
          <Form.Label htmlFor="basic-url">Username</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <Icon path={mdiAccountCircle} size={1} />
            </InputGroup.Text>
            <Form.Control placeholder="Username" />
          </InputGroup>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@gmail.com" />
          </Form.Group>

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
          <Form.Label htmlFor="basic-url">Confirm your password</Form.Label>
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
              Sign In
            </Button>
            <h3 style={styles.font}>
              <b>
                Continues <Link to="/login">Sign In</Link>
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
    height: "82vh",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: "4vh",
    borderRadius: "2vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  contBtn: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
  },
  btn: {
    width: "6vw",
  },
  font: {
    fontSize: "1.2rem",
    marginTop: "1.5vh",
  },
};
export default Register;
