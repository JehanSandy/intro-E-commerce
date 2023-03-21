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
import HistoriAdmin from "./pages/historyAdmin";
import NotFound from "./pages/404notFound";

import { keepLogin } from "./redux/action";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    let id = localStorage.getItem("idUser");
    this.props.keepLogin(id);
  }
  render() {
    console.log(this.props.role);
    if (this.props.role === "admin") {
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
            <Route path="/historyAdmin" element={<HistoriAdmin />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      );
    } else if (this.props.role === "user") {
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
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      );
    }
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.userReducer.role,
  };
};

export default connect(mapStateToProps, { keepLogin })(App);

const styles = {
  naviContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
