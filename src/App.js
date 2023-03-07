import React from "react";
import NaviBar from "./component/navibar";
import { Routes, Route } from "react-router-dom";

//import pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login";
import Register from "./pages/register";

import { keepLogin } from "./redux/action";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    let id = localStorage.getItem("idUser");
    this.props.keepLogin(id);
  }
  render() {
    return (
      <div>
        <NaviBar />
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, { keepLogin })(App);
