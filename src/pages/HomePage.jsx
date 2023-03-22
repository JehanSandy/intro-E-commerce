import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Carousel, Card, Button } from "react-bootstrap";
import "./home.css";
import Icon from "@mdi/react";
import {
  mdiBookmarkMultipleOutline,
  mdiCartArrowDown,
  mdiArrowLeftBoldBoxOutline,
  mdiArrowRightBoldBoxOutline,
} from "@mdi/js";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: [],
      product: [],
      page: 1,
      prodPerPage: 4,
      maxPage: 0,
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:2000/slider").then((res) => {
      this.setState({ carousel: res.data });
      Axios.get("http://localhost:2000/products").then((res) => {
        this.setState({
          product: res.data,
          maxPage: res.data.length / this.state.prodPerPage,
        });
      });
    });
  }
  onNexPage = () => {
    this.setState({ page: this.state.page + 1 });
  };
  onPrevPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  showPorduct = () => {
    let beginningIndex = this.state.Page - 1 * this.state.prodPerPage;
    let curentProduct = this.state.product.slice(
      beginningIndex,
      beginningIndex + this.state.prodPerPage
    );
    console.log(curentProduct);
    return this.state.product.map((item, index) => {
      return (
        <Card style={{ width: "18rem" }} className="comcart" key={index}>
          <Card.Img variant="top" src={item.images[0]} className="Cimage" />
          <Card.Body>
            <Card.Title className="Ctitle">{item.name}</Card.Title>
            <div>
              <Card.Text className="Ctext">
                {" "}
                <b>IDR {item.price.toLocaleString()}</b>
              </Card.Text>
              <div className="conBtn">
                <Button className="btns">
                  <Icon path={mdiBookmarkMultipleOutline} size={1} />
                </Button>
                <Button
                  className="btns"
                  as={Link}
                  to={`/detailPage?${item.id}`}
                >
                  <Icon path={mdiCartArrowDown} size={1} /> Buy Now
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      );
    });
  };
  render() {
    // console.log(this.state.carousel);
    console.log(this.state.product);
    return (
      <div>
        <div className="hero">
          <main className="content">
            <h1>
              Temani membaca buku dengan secangkir <span>Kopi</span>
            </h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus facere quis unde, iure sit placeat voluptates in nostrum
              consectetur voluptatibus odit eos sed doloremque minima nulla
              debitis corporis ipsam a! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptate iure ea ad numquam. Culpa, sit.
            </p>
            <a href="#product" className="cta">
              Buy Now
            </a>
          </main>
        </div>

        <div className="about">
          <h1>
            <span>About</span> Us
          </h1>
          <div className="ContAbout">
            <Carousel className="Carousel">
              {this.state.carousel.map((item, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={item.image}
                      alt={item.title}
                    />
                    <Carousel.Caption>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>

            <div className="Conten_i">
              <h3>Why you should choose our coffee?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Similique quo optio veritatis tempore voluptatibus quia?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                quae dignissimos sit tenetur? Qui consectetur, illo voluptatibus
                dolorum ipsa quos.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptas ad repellat voluptatem a dolor atque quibusdam harum,
                voluptates consequatur debitis illum ab praesentium magni quasi
                sint ipsa culpa assumenda voluptate!
              </p>
            </div>
          </div>
        </div>
        <div id="product"></div>

        {/* card section */}
        <div className="ConCart">
          <h1>
            Our <span>Product</span>
          </h1>
          <div className="arrowproduct">
            <Button
              variant="dark"
              onClick={this.onPrevPage}
              disabled={this.state.page == 1}
            >
              <Icon path={mdiArrowLeftBoldBoxOutline} size={1} />
            </Button>
            <p>
              Page {this.state.page} of {this.state.maxPage}
            </p>
            <Button
              variant="dark"
              onClick={this.onNexPage}
              disabled={this.state.page >= this.state.maxPage}
            >
              <Icon path={mdiArrowRightBoldBoxOutline} size={1} />
            </Button>
          </div>
          <div className="Cart">{this.showPorduct()}</div>
        </div>
      </div>
    );
  }
}

export default HomePage;
