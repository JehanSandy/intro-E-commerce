import React, { useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { Axios } from "axios";

import { Form, InputGroup, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiEyeOutline, mdiEyeOff } from "@mdi/js";
let url = "http://localhost:2000/";

const Tes = () => {
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    errorLogin: [false, ""],
  });
  const [visibility, setvisibility] = useState(false);

  const setVisi = () => {
    setvisibility(!visibility);
  };

  const onlogin = async () => {
    const res = await Axios.get(`${url}users`, {
      params: {
        username: dataUser.username,
        password: dataUser.password,
      },
    });
    if (res.data.length === 0) {
      return setError({
        ...error,
        errorLogin: [true, "Username or Password invalid"],
      });
    }
  };

  return (
    <div className="cont">
      <div className="conForm">
        <h1>hello world</h1>
        <h3 className="mb-4">Welcome Back!</h3>

        <Form.Label>Username</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <Icon path={mdiAccountCircle} size={1} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(text) =>
              setDataUser({ ...dataUser, username: text.target.value })
            }
            value={dataUser.username}
          />
        </InputGroup>

        <Form.Label>Password</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" onClick={setVisi}>
            {visibility ? (
              <Icon path={mdiEyeOutline} size={1} />
            ) : (
              <Icon path={mdiEyeOff} size={1} />
            )}
          </InputGroup.Text>
          <Form.Control
            placeholder="Password"
            type={visibility ? "text" : "password"}
          />
        </InputGroup>

        <div className="conBtn">
          <Button className="ButtonMod" variant="dark" onClick={onlogin}>
            Login
          </Button>
          <h3 className="font">
            Don't have an account?{" "}
            <Link to="/register" className="link" variant="dark">
              Sign In
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};
export default Tes;
