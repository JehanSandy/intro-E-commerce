import React from "react";
import "./footers.css";
import { InputGroup, Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiInstagram,
  mdiFacebook,
  mdiYoutube,
  mdiHomeCircleOutline,
  mdiTwitter,
  mdiWhatsapp,
  mdiEmailOutline,
  mdiSendCircleOutline,
} from "@mdi/js";
import { Link } from "react-router-dom";

class Footers extends React.Component {
  render() {
    return (
      <div className="mainFooter">
        <div className="leftfoot">
          <div className="sosmed">
            <div className="logo">
              <h1>
                Buku <span>coffee</span>
              </h1>
            </div>
            <div className="sosmeditem">
              <>
                <h2>Follow us for more informations</h2>
              </>
              <div>
                <Link className="Link">
                  <Icon path={mdiInstagram} size={1} />
                </Link>
                <Link className="Link">
                  <Icon path={mdiFacebook} size={1} />
                </Link>
                <Link className="Link">
                  <Icon path={mdiYoutube} size={1} />
                </Link>
                <Link className="Link">
                  <Icon path={mdiTwitter} size={1} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="middlefoot">
          <iframe
            src="https://maps.google.com/maps?q=madiun&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="img_maps"
          ></iframe>
          <div>
            <Link className="links">
              <Icon path={mdiHomeCircleOutline} size={1} /> Pahlawan street,
              Madiun City
            </Link>
            <Link className="links">
              <Icon path={mdiWhatsapp} size={1} /> +62 898 7073 xxxx
            </Link>
            <Link className="links">
              <Icon path={mdiEmailOutline} size={1} /> Buku_coffee@gmail.com
            </Link>
          </div>
        </div>

        <div className="rightfoot">
          <div className="names">
            <InputGroup className="mb-2 mx-2 mt-2">
              <Form.Control placeholder="First Name" />
            </InputGroup>

            <InputGroup className="mb-2 mx-2 mt-2">
              <Form.Control placeholder="Last Name" />
            </InputGroup>
          </div>
          <div className="email">
            <InputGroup className="mx-2">
              <InputGroup.Text id="basic-addon1">
                <Icon path={mdiEmailOutline} size={1} />
              </InputGroup.Text>
              <Form.Control placeholder="your email" />
            </InputGroup>
          </div>
          <div className="sendbutton">
            <InputGroup className="mx-2 mt-2 mb-2">
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                placeholder="Write your suggestions"
              />
              <Button variant="dark">
                <Icon path={mdiSendCircleOutline} size={1} />
              </Button>
            </InputGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Footers;
