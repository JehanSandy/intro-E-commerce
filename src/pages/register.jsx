import React from "react";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiAccountCircle,
  mdiEyeOutline,
  mdiEyeOff,
  mdiEmailOutline,
} from "@mdi/js";
import { SignIn, SignInFalse } from "../redux/action";
import { connect } from "react-redux";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility1: false,
      visibility2: false,
      userErr: [false, ""],
      emailErr: [false, ""],
      passErr: [false, ""],
      confpassErr: [false, ""],
      regisErr: [false, ""],
    };
  }

  userValid = (e) => {
    let symb = /[!@#$%^&*]/;
    if (e.target.value.length === 0) {
      return this.setState({ userErr: [false, ""] });
    } else if (symb.test(e.target.value) || e.target.value.length < 6) {
      return this.setState({
        userErr: [
          true,
          "username must containt 6 character and can't include Symbol",
        ],
      });
    } else {
      return this.setState({ userErr: [false, ""] });
    }
  };

  emailValid = (e) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (e.target.value.length === 0) {
      return this.setState({ emailErr: [false, ""] });
    } else if (!regex.test(e.target.value)) {
      return this.setState({ emailErr: [true, "Your E-mail not valid"] });
    } else {
      this.setState({ emailErr: [false, ""] });
    }
  };

  passValid = (e) => {
    let number = /[0-9]/;
    let symb = /[!@#$%^&*]/;
    if (e.target.value.length === 0) {
      return this.setState({ passErr: [false, ""] });
    } else if (
      !symb.test(e.target.value) ||
      !number.test(e.target.value) ||
      e.target.value.length < 6
    ) {
      return this.setState({
        passErr: [true, "password must contain number and symbol"],
      });
    } else {
      return this.setState({ passErr: [false, ""] });
    }
  };

  confpasswordValid = (e) => {
    if (e.target.value.length === 0) {
      return this.setState({ confpassErr: [false, ""] });
    } else if (this.refs.confpassword.value !== this.refs.password.value) {
      return this.setState({
        confpassErr: [true, "your confirm password not match"],
      });
    } else {
      return this.setState({ confpassErr: [false, ""] });
    }
  };

  onSignIn = () => {
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    let email = this.refs.email.value;
    let confpassword = this.refs.confpassword.value;
    //tidak boleh ada input yg kosong
    if (!username || !password || !email)
      return this.setState({ regisErr: [true, "Please Input All data"] });
    //tidak boleh error pada input

    if (
      this.state.userErr[0] ||
      this.state.emailErr[0] ||
      this.state.passErr[0]
    )
      return this.setState({
        regisErr: [true, "make sure your input is valid"],
      });
    //password valid
    if (confpassword !== password)
      return this.setState({
        regisErr: [true, "make sure your confirm password is valid"],
      });
    //username sudah ada atau belum
    //tidak email yg sama
    let obj = {
      username,
      email,
      password,
      role: "user",
    };
    this.props.SignIn(username, email, obj);
    console.log(username, email, obj);
  };

  render() {
    if (this.props.successreg) {
      return <Navigate to="/login" />;
    }
    const { visibility1, visibility2 } = this.state;
    return (
      <div style={styles.mainBackground}>
        <div style={styles.cont}>
          <div style={styles.contForm}>
            <h1>Sign In</h1>

            {/* Form for Username */}
            <Form.Label htmlFor="basic-url" className="mb-0">
              Username
            </Form.Label>
            <InputGroup className="mb-0">
              <InputGroup.Text id="basic-addon1">
                <Icon path={mdiAccountCircle} size={1} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Username"
                onChange={(e) => this.userValid(e)}
                ref="username"
              />
            </InputGroup>
            <Form.Text style={styles.TextErr} className="mt-0, mb-2">
              {this.state.userErr[0] ? this.state.userErr[1] : ""}
            </Form.Text>

            {/* Form for E-mail */}
            <Form.Label htmlFor="basic-url" className="mb-0">
              Add your E-mail
            </Form.Label>
            <InputGroup className="mb-0">
              <InputGroup.Text id="basic-addon1">
                <Icon path={mdiEmailOutline} size={1} />
              </InputGroup.Text>
              <Form.Control
                placeholder="name@gmail.com"
                onChange={(e) => this.emailValid(e)}
                ref="email"
              />
            </InputGroup>
            <Form.Text style={styles.TextErr} className="mt-0, mb-2">
              {this.state.emailErr[0] ? this.state.emailErr[1] : ""}
            </Form.Text>

            {/* Form for Password */}
            <Form.Label htmlFor="basic-url" className="mb-0">
              Password
            </Form.Label>
            <InputGroup className="mb-0">
              <InputGroup.Text
                id="basic-addon1"
                onClick={() => this.setState({ visibility1: !visibility1 })}
              >
                {visibility1 ? (
                  <Icon path={mdiEyeOutline} size={1} />
                ) : (
                  <Icon path={mdiEyeOff} size={1} />
                )}
              </InputGroup.Text>
              <Form.Control
                placeholder="Password"
                type={visibility1 ? "text" : "password"}
                onChange={(e) => this.passValid(e)}
                ref="password"
              />
            </InputGroup>
            <Form.Text style={styles.TextErr} className="mt-0, mb-2">
              {this.state.passErr[0] ? this.state.passErr[1] : ""}
            </Form.Text>

            {/* From for Confirm Password */}
            <Form.Label htmlFor="basic-url" className="mb-0">
              Confirm your password
            </Form.Label>
            <InputGroup className="mb-0">
              <InputGroup.Text
                id="basic-addon1"
                onClick={() => this.setState({ visibility2: !visibility2 })}
              >
                {visibility2 ? (
                  <Icon path={mdiEyeOutline} size={1} />
                ) : (
                  <Icon path={mdiEyeOff} size={1} />
                )}
              </InputGroup.Text>
              <Form.Control
                placeholder="Password"
                type={visibility2 ? "text" : "password"}
                onChange={(e) => this.confpasswordValid(e)}
                ref="confpassword"
              />
            </InputGroup>
            <Form.Text style={styles.TextErr} className="mt-0, mb-2">
              {this.state.confpassErr[0] ? this.state.confpassErr[1] : ""}
            </Form.Text>

            {/* Button Sign In */}
            <div style={styles.contBtn}>
              <Button
                variant="primary"
                style={styles.btn}
                onClick={() => this.onSignIn()}
              >
                Sign In
              </Button>
              <h3 style={styles.font}>
                <b>
                  Continues <Link to="/login">Login</Link>
                </b>
              </h3>
            </div>
          </div>

          {/* modal error regist */}
          <Modal show={this.state.regisErr[0]}>
            <Modal.Header>
              <Modal.Title>error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.regisErr[1]}</Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => this.setState({ regisErr: [false, ""] })}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* modal error SignIn */}
          <Modal show={this.props.errorReg[0]}>
            <Modal.Header>
              <Modal.Title>error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.errorReg[1]}</Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => this.props.SignInFalse()}
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

const styles = {
  mainBackground: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1598633461148-98668f2b67d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80)",
    backgroundSize: "cover",
    // backgroundPosition: "0% 30%",
    backgroundRepeat: "no-repeat",
  },
  cont: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contForm: {
    marginTop: "7vh",
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
  TextErr: {
    marginTop: "1vh",
    color: "red",
    fontSize: "0.8rem",
  },
};

const mapStateToProps = (state) => {
  return {
    errorReg: state.userReducer.regisErr,
    successreg: state.userReducer.regisSuccess,
  };
};

export default connect(mapStateToProps, { SignIn, SignInFalse })(Register);
