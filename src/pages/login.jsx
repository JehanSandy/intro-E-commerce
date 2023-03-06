import React from "react";
import { InputGroup, Form, Button, Modal } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiEyeOutline, mdiEyeOff } from "@mdi/js";
import { Link, redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Login, errorLoginFalse } from "../redux/action";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      error1: false,
      error2: false,
      error3: false,
      errorLogin: true,
    };
  }

  onLogin = () => {
    //ambil data dari input user name dan password
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    console.log(username, password);
    //kalau ada input yg masih kosong di kasih notif data tidak boleh kosong
    if (!username && !password) {
      return this.setState({ error1: true });
    } else if (!password) {
      return this.setState({ error2: true });
    } else if (!username) {
      return this.setState({ error3: true });
    }
    //cek data yg di kirim oleh user sudah ada di data user
    this.props.Login(username, password);
    // kalau ada nanti langsung ke landingPage
  };

  render() {
    // cek apakah username sudah ada atau belum
    if (this.props.username) {
      return redirect("/");
    }
    console.log(this.props.username);

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
            <Form.Control placeholder="Username" ref="username" />
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
              ref="password"
            />
          </InputGroup>

          <div style={styles.contBtn}>
            <Button onClick={this.onLogin} variant="primary" style={styles.btn}>
              Login
            </Button>
            <h3 style={styles.font}>
              <b>
                Don't have an account? <Link to="/register">Sign In</Link>
              </b>
            </h3>
          </div>
        </div>
        <Modal show={this.state.error1}>
          <Modal.Header>
            <Modal.Title>error</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please fill in your account data completely</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.setState({ error1: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.error2}>
          <Modal.Header>
            <Modal.Title>error</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please input your password</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.setState({ error2: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.error3}>
          <Modal.Header>
            <Modal.Title>error</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please input your username</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.setState({ error3: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* alert validasi user */}
        <Modal show={this.props.errorLogin}>
          <Modal.Header>
            <Modal.Title>error</Modal.Title>
          </Modal.Header>
          <Modal.Body>This account doesn't axis</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.props.errorLoginFalse()}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
const styles = {
  cont: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1519305124423-5ccccff55da9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "50% 65%",
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

const mapStateToProps = (state) => {
  return {
    errorLogin: state.userReducer.errorLogin,
    username: state.userReducer.username,
  };
};
export default connect(mapStateToProps, { Login, errorLoginFalse })(LoginPage);
