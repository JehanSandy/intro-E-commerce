import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
  Carousel,
  Card,
  Button,
  Accordion,
  Form,
  InputGroup,
} from "react-bootstrap";
import "./home.css";
import Icon from "@mdi/react";
import {
  mdiBookmarkMultipleOutline,
  mdiCartArrowDown,
  mdiArrowLeftBoldBoxOutline,
  mdiArrowRightBoldBoxOutline,
  mdiMagnify,
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
      Coffees: [],
      kateCoffee: [],
      NonCoffees: [],
      kateNonCoffee: [],
      Foods: [],
      kateFood: [],
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:2000/slider").then((res) => {
      this.setState({ carousel: res.data });
      Axios.get("http://localhost:2000/products").then((res) => {
        this.setState({
          product: res.data,
          Coffees: res.data.filter((item) => {
            return item.category.includes("coffee");
          }),
          kateCoffee: res.data.filter((item) => {
            return item.category.includes("coffee");
          }),
          NonCoffees: res.data.filter((item) => {
            return item.category.includes("non coffee");
          }),
          kateNonCoffee: res.data.filter((item) => {
            return item.category.includes("non coffee");
          }),
          Foods: res.data.filter((item) => {
            return item.category.includes("food");
          }),
          kateFood: res.data.filter((item) => {
            return item.category.includes("food");
          }),
        });
      });
    });
  }
  FilterCoffee = () => {
    let coffee = this.refs.coffee.value;

    if (coffee) {
      return this.setState({
        kateCoffee: this.state.Coffees.filter((item) => {
          return item.name.toLowerCase().includes(coffee.toLowerCase());
        }),
      });
    } else if (!coffee) {
      return this.setState({
        kateCoffee: this.state.product.filter((item) => {
          return item.category.includes("coffee");
        }),
      });
    }
  };
  FilterNonCoffee = () => {
    let nonCoffee = this.refs.nonCoffee.value;
    if (nonCoffee) {
      return this.setState({
        kateNonCoffee: this.state.NonCoffees.filter((item) => {
          return item.name.toLowerCase().includes(nonCoffee.toLowerCase());
        }),
      });
    } else if (!nonCoffee) {
      return this.setState({ kateNonCoffee: this.state.NonCoffees });
    }
  };
  filterFood = () => {
    let food = this.refs.food.value;
    if (food) {
      return this.setState({
        kateFood: this.state.Foods.filter((item) => {
          return item.name.toLowerCase().includes(food.toLowerCase());
        }),
      });
    } else if (!food) {
      return this.setState({ kateFood: this.state.Foods });
    }
  };
  showPorduct = (data) => {
    // console.log(curentProduct);
    return data.map((item, index) => {
      return (
        <Card className="comcart" key={index}>
          <Card.Img variant="top" src={item.images[0]} className="woyimage" />
          <Card.Body>
            <Card.Title className="Ctitle">{item.name}</Card.Title>
            <div>
              <Card.Text className="Ctext">
                {" "}
                <b>IDR {item.price.toLocaleString()}</b>
              </Card.Text>
              <div className="woy">
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
    console.log(this.state.kateCoffee);
    // console.log(this.state.kateNonCoffee);
    // console.log(this.state.kateFood);
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
          <div className="Cart">
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3>Our Coffee menu</h3>
                </Accordion.Header>
                <Accordion.Body className="Accor">
                  <div className="Ingrup">
                    <InputGroup className="isi">
                      <Form.Control
                        placeholder="Search your coffee"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        ref="coffee"
                        onChange={this.FilterCoffee}
                      />
                      <InputGroup.Text id="basic-addon1">
                        <Icon path={mdiMagnify} size={1} />
                      </InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="Acart">
                    {this.showPorduct(this.state.kateCoffee)}
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <h3>Non Coffee menu</h3>
                </Accordion.Header>
                <Accordion.Body className="Accor">
                  <div className="Ingrup">
                    <InputGroup className="isi" style={{ width: "19rem" }}>
                      <Form.Control
                        placeholder="Search your drink or dessert"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        ref="nonCoffee"
                        onChange={this.FilterNonCoffee}
                      />
                      <InputGroup.Text id="basic-addon1">
                        <Icon path={mdiMagnify} size={1} />
                      </InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="Acart">
                    {this.showPorduct(this.state.kateNonCoffee)}
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <h3>Our Food menu</h3>
                </Accordion.Header>
                <Accordion.Body className="Accor">
                  <div className="Ingrup">
                    <InputGroup className="isi">
                      <Form.Control
                        placeholder="Search your food or snack"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        ref="food"
                        onChange={this.filterFood}
                      />
                      <InputGroup.Text id="basic-addon1">
                        <Icon path={mdiMagnify} size={1} />
                      </InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="Acart">
                    {this.showPorduct(this.state.kateFood)}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
