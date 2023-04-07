import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  render() {
    return (
      <div className="maincontainer">
        <h1>404 not found</h1>
        <Button as={Link} to="/" variant="dark">
          Go to Home
        </Button>
      </div>
    );
  }
}

export default NotFound;
