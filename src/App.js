import React from "react";
import NaviBar from "./component/navibar";
import { Routes, Route } from "react-router-dom";

//import pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login";
import Register from "./pages/register";
import DetailPage from "./pages/detailPage";
import CartPage from "./pages/cart";
import History from "./pages/history";

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
        <div style={styles.naviContainer}>
          <NaviBar />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} exact />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<Register />} />

          <Route path="/detailPage" element={<DetailPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/tohistory" element={<History />} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, { keepLogin })(App);

const styles = {
  naviContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
